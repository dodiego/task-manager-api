import casual from "casual";
import { AuthenticationError, generateAccessToken } from "core/utils/crypto";
import { BusinessRuleError, PrivateHandler } from "core/utils/types";
import { ValidationError } from "core/utils/validate-json-schema";
import { TaskStatus } from "database";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import {
  archiveOwnTaskFactory,
  ArchiveOwnTaskInput,
  ArchiveOwnTaskOutput,
  Dependencies,
} from "./archive-own-task";

describe("Archive own task", () => {
  let userToken: string;
  let userId: string;
  let mockedDependencies: DeepMockProxy<Dependencies>;
  let archiveOwnTask: PrivateHandler<ArchiveOwnTaskInput, ArchiveOwnTaskOutput>;
  beforeEach(async () => {
    mockedDependencies = mockDeep();

    archiveOwnTask = archiveOwnTaskFactory(mockedDependencies);
    userId = casual.uuid;
    const result = await generateAccessToken({
      userId,
    });
    userToken = result.token;
  });

  it("Should succeed using valid inputs", async () => {
    const input: ArchiveOwnTaskInput = {
      taskId: casual.uuid,
    };

    mockedDependencies.findTaskById.mockResolvedValue({
      id: casual.uuid,
      description: casual.description,
      isArchived: false,
      status: TaskStatus.Done,
      taskCategoryId: casual.uuid,
      title: casual.title,
      userId,
    });

    await archiveOwnTask(userToken, input);

    expect(mockedDependencies.updateTask).toHaveBeenCalledWith(input.taskId, {
      isArchived: true,
    });
  });

  it("Should fail if user token is invalid", async () => {
    const result = archiveOwnTask("invalid token", {
      taskId: casual.uuid,
    });

    await expect(result).rejects.toThrowError("Invalid token");
    await expect(result).rejects.toBeInstanceOf(AuthenticationError);
    expect(mockedDependencies.updateTask).not.toHaveBeenCalled();
  });

  it("Should fail when task id is invalid", async () => {
    const promise = archiveOwnTask(userToken, {
      taskId: "invalid uuid",
    });

    await expect(promise).rejects.toThrowError(
      "'taskId' is a required string and must be an uuid"
    );
    await expect(promise).rejects.toBeInstanceOf(ValidationError);
    expect(mockedDependencies.updateTask).not.toHaveBeenCalled();
  });

  it("Should fail when task id is empty", async () => {
    const promise = archiveOwnTask(userToken, {
      taskId: "",
    });

    await expect(promise).rejects.toThrowError(
      "'taskId' is a required string and must be an uuid"
    );
    await expect(promise).rejects.toBeInstanceOf(ValidationError);
    expect(mockedDependencies.updateTask).not.toHaveBeenCalled();
  });

  it("Should fail when task id is null", async () => {
    const promise = archiveOwnTask(userToken, {
      taskId: null,
    } as any);

    await expect(promise).rejects.toThrowError(
      "'taskId' is a required string and must be an uuid"
    );
    await expect(promise).rejects.toBeInstanceOf(ValidationError);
    expect(mockedDependencies.updateTask).not.toHaveBeenCalled();
  });

  it("Should fail when task does not exist", async () => {
    const promise = archiveOwnTask(userToken, {
      taskId: casual.uuid,
    });

    await expect(promise).rejects.toThrowError("Task does not exist");
    await expect(promise).rejects.toBeInstanceOf(BusinessRuleError);
    expect(mockedDependencies.updateTask).not.toHaveBeenCalled();
  });

  it("Should fail if it is already archived", async () => {
    mockedDependencies.findTaskById.mockResolvedValue({
      id: casual.uuid,
      isArchived: true,
      description: casual.description,
      status: TaskStatus.InProgress,
      taskCategoryId: casual.uuid,
      title: casual.title,
      userId,
    });

    const promise = archiveOwnTask(userToken, {
      taskId: casual.uuid,
    });

    await expect(promise).rejects.toThrowError("Task is already archived");
    await expect(promise).rejects.toBeInstanceOf(BusinessRuleError);
    expect(mockedDependencies.updateTask).not.toHaveBeenCalled();
  });

  it("Should fail if it does not exist", async () => {
    const promise = archiveOwnTask(userToken, {
      taskId: casual.uuid,
    });

    await expect(promise).rejects.toThrowError("Task does not exist");
    await expect(promise).rejects.toBeInstanceOf(BusinessRuleError);
    expect(mockedDependencies.updateTask).not.toHaveBeenCalled();
  });

  it("Should fail if owner is different than requester", async () => {
    mockedDependencies.findTaskById.mockResolvedValue({
      id: casual.uuid,
      isArchived: false,
      description: casual.description,
      status: TaskStatus.InProgress,
      taskCategoryId: casual.uuid,
      title: casual.title,
      userId: casual.uuid,
    });
    const promise = archiveOwnTask(userToken, {
      taskId: casual.uuid,
    });

    await expect(promise).rejects.toThrowError(
      "You are not allowed to perform this action"
    );
    await expect(promise).rejects.toBeInstanceOf(BusinessRuleError);
    expect(mockedDependencies.updateTask).not.toHaveBeenCalled();
  });
});
