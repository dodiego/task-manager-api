import createOwnTask from "core/task-management/create-own-task";
import {
  CreateTaskSuccessOutput,
  MutationResolvers,
} from "graphql/generated/graphql-types";
import { PrivateGraphQlResolverHandler } from "graphql/utils/unified-handler";

export const CreateTaskResolver: MutationResolvers["createTask"] = async (
  _,
  { input },
  context
) => {
  const result = await PrivateGraphQlResolverHandler<CreateTaskSuccessOutput>(
    async () => {
      const { task } = await createOwnTask(context.userToken!, {
        taskCategoryId: input.taskCategoryId,
        taskTitle: input.taskTitle,
        taskDescription: input.taskDescription!,
      });
      return {
        __typename: "CreateTaskSuccessOutput",
        task,
      };
    }
  );
  return result;
};
