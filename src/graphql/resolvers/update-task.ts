import updateOwnTask from "core/task-management/update-own-task";
import {
  MutationResolvers,
  UpdateTaskSuccessOutput,
} from "graphql/generated/graphql-types";
import { PrivateGraphQlResolverHandler } from "graphql/utils/unified-handler";

export const UpdateTaskResolver: MutationResolvers["updateTask"] = async (
  _,
  { input },
  context
) => {
  const result = await PrivateGraphQlResolverHandler<UpdateTaskSuccessOutput>(
    async () => {
      const { task } = await updateOwnTask(context.userToken!, {
        newTaskCategoryId: input.newTaskColumnId,
        newTaskTitle: input.newTaskTitle,
        newTaskDescription: input.newTaskDescription,
        taskId: input.taskId,
      });
      return {
        __typename: "UpdateTaskSuccessOutput",
        task,
      };
    }
  );
  return result;
};
