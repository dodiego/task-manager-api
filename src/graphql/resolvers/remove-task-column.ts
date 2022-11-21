import removeOwnTaskCategory from "core/task-management/remove-own-task-category";
import {
  MutationResolvers,
  RemoveTaskColumnSuccessOutput,
} from "graphql/generated/graphql-types";
import { PrivateGraphQlResolverHandler } from "graphql/utils/unified-handler";

export const RemoveTaskColumnResolver: MutationResolvers["removeTaskColumn"] =
  async (_, { input }, context) => {
    const result =
      await PrivateGraphQlResolverHandler<RemoveTaskColumnSuccessOutput>(
        async () => {
          const { taskCategory } = await removeOwnTaskCategory(
            context.userToken!,
            {
              taskCategoryId: input.taskColumnId,
            }
          );
          return {
            __typename: "RemoveTaskColumnSuccessOutput",
            taskColumn: taskCategory,
          };
        }
      );
    return result;
  };
