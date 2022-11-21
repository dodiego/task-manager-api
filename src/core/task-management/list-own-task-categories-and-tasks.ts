import { getUserDataFromToken } from "core/utils/crypto";
import { PrivateHandlerFactory } from "core/utils/types";
import {
  findTaskCategoriesAndTasksByUserId,
  TaskCategoryModel,
} from "database";

export type Dependencies = {
  findTaskCategoriesAndTasksByUserId: typeof findTaskCategoriesAndTasksByUserId;
};

export type ListOwnTaskCategoriesAndTasksInput = undefined | null;

export type ListOwnTaskCategoriesAndTasksOutput = {
  taskCategories: TaskCategoryModel[];
};
export const listOwnTaskCategoriesAndTasksFactory: PrivateHandlerFactory<
  Dependencies,
  ListOwnTaskCategoriesAndTasksInput,
  ListOwnTaskCategoriesAndTasksOutput
> =
  ({ findTaskCategoriesAndTasksByUserId }) =>
  async (userToken) => {
    const { userId } = await getUserDataFromToken(userToken);

    const taskCategories = await findTaskCategoriesAndTasksByUserId(userId);
    return { taskCategories };
  };

export default listOwnTaskCategoriesAndTasksFactory({
  findTaskCategoriesAndTasksByUserId,
});
