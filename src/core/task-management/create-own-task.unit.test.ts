import casual from "casual";
import { AuthenticationError, generateUserToken } from "core/utils/crypto";
import {
  createOwnTaskFactory,
  CreateOwnTaskInput,
  CreateOwnTaskOutput,
  Dependencies,
} from "./create-own-task";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import { PrivateHandler } from "core/utils/types";
import { ValidationError } from "core/utils/validate-json-schema";

describe("Create Own Task", () => {
  let userToken: string;
  let userId: string;
  let mockedDependencies: DeepMockProxy<Dependencies>;
  let createOwnTask: PrivateHandler<CreateOwnTaskInput, CreateOwnTaskOutput>;
  beforeEach(async () => {
    mockedDependencies = mockDeep();

    createOwnTask = createOwnTaskFactory(mockedDependencies);
    userId = casual.uuid;
    const result = await generateUserToken({
      userId,
    });
    userToken = result.token;
  });
  it("Should succeed to create own task using valid inputs", async () => {
    const payload: CreateOwnTaskInput = {
      taskTitle: casual.title,
      taskDescription: casual.description,
      taskCategoryId: casual.uuid,
    };
    await createOwnTask(userToken, payload);
    expect(mockedDependencies.createTask).toHaveBeenCalledWith({
      title: payload.taskTitle,
      description: payload.taskDescription,
      userId,
      taskCategoryId: payload.taskCategoryId,
    });
  });

  it("Should fail to create own task if user token is invalid", async () => {
    const result = createOwnTask("invalid token", {
      taskTitle: casual.title,
      taskCategoryId: casual.uuid,
      taskDescription: casual.description,
    });

    await expect(result).rejects.toThrowError("Invalid token");
    expect(result).rejects.toBeInstanceOf(AuthenticationError);
  });

  it("Should fail to create own task if title is null", async () => {
    const result = createOwnTask(userToken, {
      taskCategoryId: casual.uuid,
      taskDescription: casual.description,
    } as any);

    await expect(result).rejects.toThrowError(
      "'taskTitle' is a required string with have at least 1 character and at most 300 characters"
    );
    expect(result).rejects.toBeInstanceOf(ValidationError);
  });

  it("Should fail to create own task if title is empty", async () => {
    const result = createOwnTask(userToken, {
      taskTitle: "",
      taskCategoryId: casual.uuid,
      taskDescription: casual.description,
    });

    await expect(result).rejects.toThrowError(
      "'taskTitle' is a required string with have at least 1 character and at most 300 characters"
    );
    expect(result).rejects.toBeInstanceOf(ValidationError);
  });

  it("Should fail to create own task if title have more than 300 characters", async () => {
    const result = createOwnTask(userToken, {
      taskCategoryId: casual.uuid,
      taskDescription: casual.description,
      taskTitle: casual.words(60),
    });

    await expect(result).rejects.toThrowError(
      "'taskTitle' is a required string with have at least 1 character and at most 300 characters"
    );
    expect(result).rejects.toBeInstanceOf(ValidationError);
  });

  it("Should fail to create own task if description have more than 6000 characters", async () => {
    const result = createOwnTask(userToken, {
      taskCategoryId: casual.uuid,
      taskDescription: casual.words(6000),
      taskTitle: casual.title,
    });

    await expect(result).rejects.toThrowError(
      "'taskDescription' is an optional string with at most 6000 character"
    );
    expect(result).rejects.toBeInstanceOf(ValidationError);
  });
});
