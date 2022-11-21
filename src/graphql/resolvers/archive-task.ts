import archiveOwnTask from "core/task-management/archive-own-task";
import {
  ArchiveTaskSuccessOutput,
  MutationResolvers,
} from "graphql/generated/graphql-types";
import { PrivateGraphQlResolverHandler } from "graphql/utils/unified-handler";

export const ArchiveTaskResolver: MutationResolvers["archiveTask"] = async (
  _,
  { input },
  context
) => {
  const result = await PrivateGraphQlResolverHandler<ArchiveTaskSuccessOutput>(
    async () => {
      const { task } = await archiveOwnTask(context.userToken!, {
        taskId: input.taskId,
      });
      return {
        __typename: "ArchiveTaskSuccessOutput",
        task,
      };
    }
  );
  return result;
};
