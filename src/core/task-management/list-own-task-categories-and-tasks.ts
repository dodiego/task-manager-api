import { getUserDataFromToken } from "core/utils/crypto";
import { PrivateHandlerFactory } from "core/utils/types";
import {
  findTaskCategoriesAndTasksByUserId,
  TaskCategoryModel,
} from "database";

export type Dependencies = {
  findTaskCategoriesAndTasksByUserId: typeof findTaskCategoriesAndTasksByUserId;
};

export type CreateOwnTaskCategoryInput = undefined | null;

export type CreateOwnTaskCategoryOutput = {
  taskCategories: TaskCategoryModel[];
};
export const listOwnTaskCategoriesAndTasks: PrivateHandlerFactory<
  Dependencies,
  CreateOwnTaskCategoryInput,
  CreateOwnTaskCategoryOutput
> =
  ({ findTaskCategoriesAndTasksByUserId }) =>
  async (userToken) => {
    const { userId } = await getUserDataFromToken(userToken);

    const taskCategories = await findTaskCategoriesAndTasksByUserId(userId);
    return { taskCategories };
  };

export default listOwnTaskCategoriesAndTasks({
  findTaskCategoriesAndTasksByUserId,
});
