import createOwnTaskCategory from "core/task-management/create-own-task-category";
import {
  CreateTaskColumnSuccessOutput,
  MutationResolvers,
} from "graphql/generated/graphql-types";
import { PrivateGraphQlResolverHandler } from "graphql/utils/unified-handler";

export const CreateTaskColumnResolver: MutationResolvers["createTaskColumn"] =
  async (_, { input }, context) => {
    const result =
      await PrivateGraphQlResolverHandler<CreateTaskColumnSuccessOutput>(
        async () => {
          const { taskCategory } = await createOwnTaskCategory(
            context.userToken!,
            {
              taskCategoryName: input.name,
            }
          );
          return {
            __typename: "CreateTaskColumnSuccessOutput",
            taskColumn: taskCategory,
          };
        }
      );
    return result;
  };
