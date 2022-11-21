import casual from "casual";
import { AuthenticationError, generateAccessToken } from "core/utils/crypto";
import { BusinessRuleError, PrivateHandler } from "core/utils/types";
import { ValidationError } from "core/utils/validate-json-schema";
import { TaskStatus } from "database";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import {
  Dependencies,
  updateOwnTaskFactory,
  UpdateOwnTaskInput,
  UpdateOwnTaskOutput,
} from "./update-own-task";

describe("Update own task", () => {
  let userToken: string;
  let userId: string;
  let mockedDependencies: DeepMockProxy<Dependencies>;
  let updateOwnTask: PrivateHandler<UpdateOwnTaskInput, UpdateOwnTaskOutput>;
  beforeEach(async () => {
    mockedDependencies = mockDeep();

    updateOwnTask = updateOwnTaskFactory(mockedDependencies);
    userId = casual.uuid;
    const result = await generateAccessToken({
      userId,
    });
    userToken = result.token;
  });

  it("Should succeed to update own task using valid inputs", async () => {
    const input: UpdateOwnTaskInput = {
      taskId: casual.uuid,
      newTaskCategoryId: casual.uuid,
      newTaskDescription: null,
    };

    mockedDependencies.findTaskCategoryById.mockResolvedValue({
      id: casual.uuid,
      name: casual.title,
      userId,
      tasks: [],
    });

    mockedDependencies.findTaskById.mockResolvedValue({
      description: "",
      id: casual.uuid,
      isArchived: false,
      status: TaskStatus.Done,
      taskCategoryId: casual.uuid,
      title: casual.title,
      userId,
    });

    await updateOwnTask(userToken, input);

    expect(mockedDependencies.updateTask).toHaveBeenCalledWith(input.taskId, {
      title: input.newTaskTitle,
      description: input.newTaskDescription,
      taskCategoryId: input.newTaskCategoryId,
    });
  });

  it("Should fail if user token is invalid", async () => {
    const result = updateOwnTask("invalid token", {
      taskId: casual.uuid,
      newTaskCategoryId: casual.uuid,
      newTaskDescription: null,
    });

    await expect(result).rejects.toThrowError("Invalid token");
    await expect(result).rejects.toBeInstanceOf(AuthenticationError);
    expect(mockedDependencies.updateTask).not.toHaveBeenCalled();
  });

  it("Should fail if task title is empty", async () => {
    const result = updateOwnTask(userToken, {
      newTaskCategoryId: casual.uuid,
      newTaskTitle: "",
      taskId: casual.uuid,
    });

    await expect(result).rejects.toThrowError(
      "'newTaskTitle' is an optional string with at least 1 character and at most 300 characters"
    );
    await expect(result).rejects.toBeInstanceOf(ValidationError);

    expect(mockedDependencies.updateTask).not.toHaveBeenCalled();
  });

  it("Should fail if task does not exist", async () => {
    const input: UpdateOwnTaskInput = {
      taskId: casual.uuid,
      newTaskCategoryId: casual.uuid,
      newTaskDescription: null,
    };

    mockedDependencies.findTaskCategoryById.mockResolvedValue({
      id: casual.uuid,
      name: casual.title,
      userId,
      tasks: [],
    });

    mockedDependencies.findTaskById.mockResolvedValue(null);

    const promise = updateOwnTask(userToken, input);

    await expect(promise).rejects.toThrowError("Task does not exist");
    await expect(promise).rejects.toBeInstanceOf(BusinessRuleError);
    expect(mockedDependencies.updateTask).not.toHaveBeenCalled();
  });
  it("Should fail if task category does not exist", async () => {
    const input: UpdateOwnTaskInput = {
      taskId: casual.uuid,
      newTaskCategoryId: casual.uuid,
      newTaskDescription: null,
    };

    mockedDependencies.findTaskCategoryById.mockResolvedValue(null);

    mockedDependencies.findTaskById.mockResolvedValue({
      description: "",
      id: casual.uuid,
      isArchived: false,
      status: TaskStatus.Done,
      taskCategoryId: casual.uuid,
      title: casual.title,
      userId,
    });

    const promise = updateOwnTask(userToken, input);

    await expect(promise).rejects.toThrowError("Task Category does not exist");
    await expect(promise).rejects.toBeInstanceOf(BusinessRuleError);
    expect(mockedDependencies.updateTask).not.toHaveBeenCalled();
  });
  it("Should fail if task owner is different than requester", async () => {
    const input: UpdateOwnTaskInput = {
      taskId: casual.uuid,
      newTaskCategoryId: casual.uuid,
      newTaskDescription: null,
    };

    mockedDependencies.findTaskCategoryById.mockResolvedValue({
      id: casual.uuid,
      name: casual.title,
      userId,
      tasks: [],
    });

    mockedDependencies.findTaskById.mockResolvedValue({
      description: "",
      id: casual.uuid,
      isArchived: false,
      status: TaskStatus.Done,
      taskCategoryId: casual.uuid,
      title: casual.title,
      userId: casual.uuid,
    });

    const promise = updateOwnTask(userToken, input);

    await expect(promise).rejects.toThrowError(
      "You are not allowed to perform this action"
    );
    await expect(promise).rejects.toBeInstanceOf(BusinessRuleError);
    expect(mockedDependencies.updateTask).not.toHaveBeenCalled();
  });
  it("Should fail if task category owner is different than requester", async () => {
    const input: UpdateOwnTaskInput = {
      taskId: casual.uuid,
      newTaskCategoryId: casual.uuid,
      newTaskDescription: null,
    };

    mockedDependencies.findTaskCategoryById.mockResolvedValue({
      id: casual.uuid,
      name: casual.title,
      userId: casual.uuid,
      tasks: [],
    });

    mockedDependencies.findTaskById.mockResolvedValue({
      description: "",
      id: casual.uuid,
      isArchived: false,
      status: TaskStatus.Done,
      taskCategoryId: casual.uuid,
      title: casual.title,
      userId,
    });

    const promise = updateOwnTask(userToken, input);

    await expect(promise).rejects.toThrowError(
      "You are not allowed to perform this action"
    );
    await expect(promise).rejects.toBeInstanceOf(BusinessRuleError);
    expect(mockedDependencies.updateTask).not.toHaveBeenCalled();
  });
});
