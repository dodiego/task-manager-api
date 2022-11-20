import createOwnTask from "core/task-management/create-own-task";
import { MutationResolvers } from "graphql/generated/graphql-types";

export const CreateTask: MutationResolvers["createTask"] = async (
  _,
  { input },
  context
) => {
  const result = await createOwnTask(context.userToken, {
    taskCategoryId: input.taskCategoryId,
    taskTitle: input.taskTitle,
    taskDescription: input.taskDescription!,
  });
  return {
    task: {
      id: result.task.id,
      status: result.task.status,
      title: result.task.title,
      description: result.task.description,
    },
  };
};
