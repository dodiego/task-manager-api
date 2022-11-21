import listOwnTaskCategoriesAndTasksFactory from "core/task-management/list-own-task-categories-and-tasks";
import { QueryResolvers } from "graphql/generated/graphql-types";

export const TaskColumnsResolver: QueryResolvers["taskColumns"] = async (
  _,
  _args,
  context
) => {
  const { taskCategories } = await listOwnTaskCategoriesAndTasksFactory(
    context.userToken!,
    null
  );

  return taskCategories;
};
