import casual from "casual";
import { AuthenticationError, generateAccessToken } from "core/utils/crypto";
import {
  createOwnTaskFactory,
  CreateOwnTaskInput,
  CreateOwnTaskOutput,
  Dependencies,
} from "./create-own-task";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import { PrivateHandler, BusinessRuleError } from "core/utils/types";
import { ValidationError } from "core/utils/validate-json-schema";

describe("Create own task", () => {
  let userToken: string;
  let userId: string;
  let mockedDependencies: DeepMockProxy<Dependencies>;
  let createOwnTask: PrivateHandler<CreateOwnTaskInput, CreateOwnTaskOutput>;
  beforeEach(async () => {
    mockedDependencies = mockDeep();

    createOwnTask = createOwnTaskFactory(mockedDependencies);
    userId = casual.uuid;
    const result = await generateAccessToken({
      userId,
    });
    userToken = result.token;
  });
  it("Should succeed using valid inputs", async () => {
    const payload: CreateOwnTaskInput = {
      taskTitle: casual.title,
      taskDescription: casual.description,
      taskCategoryId: casual.uuid,
    };
    mockedDependencies.findTaskCategoryById.mockResolvedValue({
      id: casual.uuid,
      name: casual.title,
      userId,
      tasks: [],
    });
    await createOwnTask(userToken, payload);
    expect(mockedDependencies.createTask).toHaveBeenCalledWith({
      title: payload.taskTitle,
      description: payload.taskDescription,
      userId,
      taskCategoryId: payload.taskCategoryId,
    });
  });

  it("Should fail if user token is invalid", async () => {
    const result = createOwnTask("invalid token", {
      taskTitle: casual.title,
      taskCategoryId: casual.uuid,
      taskDescription: casual.description,
    });

    await expect(result).rejects.toThrowError("Invalid token");
    await expect(result).rejects.toBeInstanceOf(AuthenticationError);
    expect(mockedDependencies.createTask).not.toHaveBeenCalled();
  });

  it("Should fail if title is null", async () => {
    const result = createOwnTask(userToken, {
      taskCategoryId: casual.uuid,
      taskDescription: casual.description,
    } as any);

    await expect(result).rejects.toThrowError(
      "'taskTitle' is a required string with at least 1 character and at most 300 characters"
    );
    await expect(result).rejects.toBeInstanceOf(ValidationError);

    expect(mockedDependencies.createTask).not.toHaveBeenCalled();
  });

  it("Should fail if title is empty", async () => {
    const result = createOwnTask(userToken, {
      taskTitle: "",
      taskCategoryId: casual.uuid,
      taskDescription: casual.description,
    });

    await expect(result).rejects.toThrowError(
      "'taskTitle' is a required string with at least 1 character and at most 300 characters"
    );
    await expect(result).rejects.toBeInstanceOf(ValidationError);
    expect(mockedDependencies.createTask).not.toHaveBeenCalled();
  });

  it("Should fail if title more than 300 characters", async () => {
    const result = createOwnTask(userToken, {
      taskCategoryId: casual.uuid,
      taskDescription: casual.description,
      taskTitle: casual.words(60),
    });

    await expect(result).rejects.toThrowError(
      "'taskTitle' is a required string with at least 1 character and at most 300 characters"
    );
    await expect(result).rejects.toBeInstanceOf(ValidationError);
    expect(mockedDependencies.createTask).not.toHaveBeenCalled();
  });

  it("Should fail if description have more than 6000 characters", async () => {
    const result = createOwnTask(userToken, {
      taskCategoryId: casual.uuid,
      taskDescription: casual.words(6000),
      taskTitle: casual.title,
    });

    await expect(result).rejects.toThrowError(
      "'taskDescription' is an optional string with at most 6000 character"
    );
    await expect(result).rejects.toBeInstanceOf(ValidationError);
    expect(mockedDependencies.createTask).not.toHaveBeenCalled();
  });

  it("Should fail if task category does not exist", async () => {
    const result = createOwnTask(userToken, {
      taskCategoryId: casual.uuid,
      taskDescription: casual.description,
      taskTitle: casual.title,
    });

    mockedDependencies.findTaskCategoryById.mockResolvedValue(null);

    await expect(result).rejects.toThrowError("Task Category does not exist");
    await expect(result).rejects.toBeInstanceOf(BusinessRuleError);
    expect(mockedDependencies.createTask).not.toHaveBeenCalled();
  });
});
