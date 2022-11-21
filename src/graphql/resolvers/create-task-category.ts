import createOwnTaskCategory from "core/task-management/create-own-task-category";
import {
  CreateTaskCategorySuccessOutput,
  MutationResolvers,
} from "graphql/generated/graphql-types";
import { PrivateGraphQlResolverHandler } from "graphql/utils/unified-handler";

export const CreateTaskCategoryResolver: MutationResolvers["createTaskCategory"] =
  async (_, { input }, context) => {
    const result =
      await PrivateGraphQlResolverHandler<CreateTaskCategorySuccessOutput>(
        async () => {
          const { taskCategory } = await createOwnTaskCategory(
            context.userToken!,
            {
              taskCategoryName: input.name,
            }
          );
          return {
            __typename: "CreateTaskCategorySuccessOutput",
            taskCategory,
          };
        }
      );
    return result;
  };
