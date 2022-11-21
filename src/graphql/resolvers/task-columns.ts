import listOwnTaskCategoriesAndTasks from "core/task-management/list-own-task-categories-and-tasks";
import { QueryResolvers } from "graphql/generated/graphql-types";

export const TaskColumnsResolver: QueryResolvers["taskColumns"] = async (
  _,
  _args,
  context
) => {
  const { taskCategories } = await listOwnTaskCategoriesAndTasks(
    context.userToken!,
    null
  );

  return taskCategories;
};
