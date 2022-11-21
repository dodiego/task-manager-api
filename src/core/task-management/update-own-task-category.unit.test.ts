import casual from "casual";
import { AuthenticationError, generateAccessToken } from "core/utils/crypto";
import { BusinessRuleError, PrivateHandler } from "core/utils/types";
import { ValidationError } from "core/utils/validate-json-schema";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import {
  Dependencies,
  updateOwnTaskCategoryFactory,
  UpdateOwnTaskCategoryInput,
  UpdateOwnTaskCategoryOutput,
} from "./update-own-task-category";

describe("Update own task category", () => {
  let userToken: string;
  let userId: string;
  let mockedDependencies: DeepMockProxy<Dependencies>;
  let updateOwnTaskCategory: PrivateHandler<
    UpdateOwnTaskCategoryInput,
    UpdateOwnTaskCategoryOutput
  >;
  beforeEach(async () => {
    mockedDependencies = mockDeep();

    updateOwnTaskCategory = updateOwnTaskCategoryFactory(mockedDependencies);
    userId = casual.uuid;
    const result = await generateAccessToken({
      userId,
    });
    userToken = result.token;
  });

  it("Should succeed using valid inputs", async () => {
    const input: UpdateOwnTaskCategoryInput = {
      taskCategoryId: casual.uuid,
      newTaskCategoryName: casual.title,
    };

    mockedDependencies.findTaskCategoryById.mockResolvedValue({
      id: casual.uuid,
      name: casual.title,
      userId,
      tasks: [],
    });

    await updateOwnTaskCategory(userToken, input);

    expect(mockedDependencies.updateTaskCategory).toHaveBeenCalledWith(
      input.taskCategoryId,
      { name: input.newTaskCategoryName }
    );
  });

  it("Should fail if user token is invalid", async () => {
    const result = updateOwnTaskCategory("invalid token", {
      taskCategoryId: casual.uuid,
      newTaskCategoryName: casual.title,
    });

    await expect(result).rejects.toThrowError("Invalid token");
    await expect(result).rejects.toBeInstanceOf(AuthenticationError);
  });

  it("Should fail if task category name is empty", async () => {
    const result = updateOwnTaskCategory(userToken, {
      taskCategoryId: casual.uuid,
      newTaskCategoryName: "",
    });

    await expect(result).rejects.toThrowError(
      "'newTaskCategoryName' is a required string with at least 1 character and at most 300 characters"
    );
    await expect(result).rejects.toBeInstanceOf(ValidationError);
  });

  it("Should fail if task category name is null", async () => {
    const result = updateOwnTaskCategory(userToken, {
      taskCategoryId: casual.uuid,
      newTaskCategoryName: null,
    } as any);

    await expect(result).rejects.toThrowError(
      "'newTaskCategoryName' is a required string with at least 1 character and at most 300 characters"
    );
    await expect(result).rejects.toBeInstanceOf(ValidationError);
  });

  it("Should fail if task category owner is different than requester", async () => {
    mockedDependencies.findTaskCategoryById.mockResolvedValue({
      id: casual.uuid,
      name: casual.title,
      userId: casual.uuid,
      tasks: [],
    });
    const result = updateOwnTaskCategory(userToken, {
      taskCategoryId: casual.uuid,
      newTaskCategoryName: casual.title,
    });

    await expect(result).rejects.toThrowError(
      "You are not allowed to perform this action"
    );
    await expect(result).rejects.toBeInstanceOf(BusinessRuleError);
  });

  it("Should fail if task category does not exist", async () => {
    const result = updateOwnTaskCategory(userToken, {
      taskCategoryId: casual.uuid,
      newTaskCategoryName: casual.title,
    });

    await expect(result).rejects.toThrowError("Task Category does not exist");
    await expect(result).rejects.toBeInstanceOf(BusinessRuleError);
    expect(mockedDependencies.updateTaskCategory).not.toHaveBeenCalled();
  });
});
