import casual from "casual";
import { AuthenticationError, generateAccessToken } from "core/utils/crypto";
import { PrivateHandler } from "core/utils/types";
import { ValidationError } from "core/utils/validate-json-schema";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import {
  createOwnTaskCategoryFactory,
  CreateOwnTaskCategoryInput,
  CreateOwnTaskCategoryOutput,
  Dependencies,
} from "./create-own-task-category";

describe("Create own task category", () => {
  let userToken: string;
  let userId: string;
  let mockedDependencies: DeepMockProxy<Dependencies>;
  let createOwnTaskCategory: PrivateHandler<
    CreateOwnTaskCategoryInput,
    CreateOwnTaskCategoryOutput
  >;
  beforeEach(async () => {
    mockedDependencies = mockDeep();

    createOwnTaskCategory = createOwnTaskCategoryFactory(mockedDependencies);
    userId = casual.uuid;
    const result = await generateAccessToken({
      userId,
    });
    userToken = result.token;
  });

  it("Should succeed with valid inputs", async () => {
    const input: CreateOwnTaskCategoryInput = {
      taskCategoryName: casual.title,
    };
    await createOwnTaskCategory(userToken, input);

    expect(mockedDependencies.createTaskCategory).toHaveBeenCalledWith({
      name: input.taskCategoryName,
      userId,
    });
  });

  it("Should fail to archive own task if user token is invalid", async () => {
    const result = createOwnTaskCategory("invalid token", {
      taskCategoryName: casual.title,
    });

    await expect(result).rejects.toThrowError("Invalid token");
    await expect(result).rejects.toBeInstanceOf(AuthenticationError);
    expect(mockedDependencies.createTaskCategory).not.toHaveBeenCalled();
  });

  it("Should fail when task category name is empty", async () => {
    const promise = createOwnTaskCategory(userId, {
      taskCategoryName: "",
    });

    await expect(promise).rejects.toThrowError(
      "'taskCategoryName' is a required string with at least 1 character and at most 300 characters"
    );
    await expect(promise).rejects.toBeInstanceOf(ValidationError);
    expect(mockedDependencies.createTaskCategory).not.toHaveBeenCalled();
  });

  it("Should fail when task category name is null", async () => {
    const promise = createOwnTaskCategory(userId, {
      taskCategoryName: null,
    } as any);

    await expect(promise).rejects.toThrowError(
      "'taskCategoryName' is a required string with at least 1 character and at most 300 characters"
    );
    await expect(promise).rejects.toBeInstanceOf(ValidationError);
    expect(mockedDependencies.createTaskCategory).not.toHaveBeenCalled();
  });

  it("Should fail when task category name have more than 300 characters", async () => {
    const promise = createOwnTaskCategory(userId, {
      taskCategoryName: casual.words(60),
    } as any);

    await expect(promise).rejects.toThrowError(
      "'taskCategoryName' is a required string with at least 1 character and at most 300 characters"
    );
    await expect(promise).rejects.toBeInstanceOf(ValidationError);
    expect(mockedDependencies.createTaskCategory).not.toHaveBeenCalled();
  });
});
