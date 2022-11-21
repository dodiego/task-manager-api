import casual from "casual";
import { AuthenticationError, generateAccessToken } from "core/utils/crypto";
import { PrivateHandler } from "core/utils/types";
import { TaskStatus } from "database";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import {
  Dependencies,
  listOwnTaskCategoriesAndTasksFactory,
  ListOwnTaskCategoriesAndTasksInput,
  ListOwnTaskCategoriesAndTasksOutput,
} from "./list-own-task-categories-and-tasks";

describe("List own task categories and tasks", () => {
  let userToken: string;
  let userId: string;
  let mockedDependencies: DeepMockProxy<Dependencies>;
  let listOwnTaskCategoriesAndTasks: PrivateHandler<
    ListOwnTaskCategoriesAndTasksInput,
    ListOwnTaskCategoriesAndTasksOutput
  >;
  beforeEach(async () => {
    mockedDependencies = mockDeep();

    listOwnTaskCategoriesAndTasks =
      listOwnTaskCategoriesAndTasksFactory(mockedDependencies);
    userId = casual.uuid;
    const result = await generateAccessToken({
      userId,
    });
    userToken = result.token;
  });

  it("Should succeed using valid inputs", async () => {
    mockedDependencies.findTaskCategoriesAndTasksByUserId.mockResolvedValue([
      {
        id: casual.uuid,
        name: casual.title,
        userId,
        tasks: [
          {
            id: casual.uuid,
            description: casual.description,
            isArchived: false,
            status: TaskStatus.Done,
            taskCategoryId: casual.uuid,
            title: casual.title,
            userId,
          },
        ],
      },
    ]);

    await listOwnTaskCategoriesAndTasks(userToken, null);

    expect(
      mockedDependencies.findTaskCategoriesAndTasksByUserId
    ).toHaveBeenCalledWith(userId);
  });

  it("Should fail if user token is invalid", async () => {
    const result = listOwnTaskCategoriesAndTasks("invalid token", null);

    await expect(result).rejects.toThrowError("Invalid token");
    await expect(result).rejects.toBeInstanceOf(AuthenticationError);
    expect(
      mockedDependencies.findTaskCategoriesAndTasksByUserId
    ).not.toHaveBeenCalled();
  });
});
