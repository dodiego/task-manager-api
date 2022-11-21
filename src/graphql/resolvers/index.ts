import { Resolvers } from "graphql/generated/graphql-types";
import { ArchiveTaskResolver } from "./archive-task";
import { CreateTaskResolver } from "./create-task";
import { CreateTaskCategoryResolver } from "./create-task-category";
import { SignInResolver } from "./sign-in";
import { SignUpResolver } from "./sign-up";
import { TaskCategoriesResolver } from "./task-categories";
import { UpdateTaskResolver } from "./update-task";

const resolvers: Resolvers = {
  Mutation: {
    createTask: CreateTaskResolver,
    updateTask: UpdateTaskResolver,
    archiveTask: ArchiveTaskResolver,
    createTaskCategory: CreateTaskCategoryResolver,
    signUp: SignUpResolver,
    signIn: SignInResolver,
  },
  Query: {
    taskCategories: TaskCategoriesResolver,
  },
};

export default resolvers;
