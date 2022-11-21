import casual from "casual";
import { AuthenticationError, generateAccessToken } from "core/utils/crypto";
import { BusinessRuleError, PrivateHandler } from "core/utils/types";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import {
  Dependencies,
  removeOwnTaskCategoryFactory,
  RemoveOwnTaskCategoryInput,
  RemoveOwnTaskCategoryOutput,
} from "./remove-own-task-category";

describe("Remove own task category", () => {
  let userToken: string;
  let userId: string;
  let mockedDependencies: DeepMockProxy<Dependencies>;
  let removeOwnTaskCategory: PrivateHandler<
    RemoveOwnTaskCategoryInput,
    RemoveOwnTaskCategoryOutput
  >;
  beforeEach(async () => {
    mockedDependencies = mockDeep();

    removeOwnTaskCategory = removeOwnTaskCategoryFactory(mockedDependencies);
    userId = casual.uuid;
    const promise = await generateAccessToken({
      userId,
    });
    userToken = promise.token;
  });

  it("Should succeed using valid inputs", async () => {
    const input: RemoveOwnTaskCategoryInput = {
      taskCategoryId: casual.uuid,
    };
    mockedDependencies.findTaskCategoryById.mockResolvedValue({
      id: casual.uuid,
      name: casual.title,
      userId,
      tasks: [],
    });

    await removeOwnTaskCategory(userToken, input);

    expect(mockedDependencies.findTaskCategoryById).toHaveBeenCalledWith(
      input.taskCategoryId
    );

    expect(mockedDependencies.removeTaskCategory).toHaveBeenCalledWith(
      input.taskCategoryId
    );
  });

  it("Should fail if user token is invalid", async () => {
    const promise = removeOwnTaskCategory("invalid token", {
      taskCategoryId: casual.uuid,
    });

    await expect(promise).rejects.toThrowError("Invalid token");
    await expect(promise).rejects.toBeInstanceOf(AuthenticationError);
    expect(mockedDependencies.removeTaskCategory).not.toHaveBeenCalled();
  });

  it("Should fail if task category does not exist", async () => {
    const promise = removeOwnTaskCategory(userToken, {
      taskCategoryId: casual.uuid,
    });

    await expect(promise).rejects.toThrowError("Task Category does not exist");
    await expect(promise).rejects.toBeInstanceOf(BusinessRuleError);
    expect(mockedDependencies.removeTaskCategory).not.toHaveBeenCalled();
  });

  it("Should fail if task category owner is different than requester", async () => {
    mockedDependencies.findTaskCategoryById.mockResolvedValue({
      id: casual.uuid,
      name: casual.title,
      userId: casual.uuid,
      tasks: [],
    });
    const promise = removeOwnTaskCategory(userToken, {
      taskCategoryId: casual.uuid,
    });

    await expect(promise).rejects.toThrowError(
      "You are not allowed to perform this action"
    );
    await expect(promise).rejects.toBeInstanceOf(BusinessRuleError);
    expect(mockedDependencies.removeTaskCategory).not.toHaveBeenCalled();
  });
});
