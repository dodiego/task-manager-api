import { Resolvers } from "graphql/generated/graphql-types";
import { ArchiveTaskResolver } from "./archive-task";
import { CreateTaskResolver } from "./create-task";
import { CreateTaskColumnResolver } from "./create-task-column";
import { SignInResolver } from "./sign-in";
import { SignUpResolver } from "./sign-up";
import { TaskColumnsResolver } from "./task-columns";
import { UpdateTaskResolver } from "./update-task";

const resolvers: Resolvers = {
  Mutation: {
    createTask: CreateTaskResolver,
    updateTask: UpdateTaskResolver,
    archiveTask: ArchiveTaskResolver,
    createTaskColumn: CreateTaskColumnResolver,
    signUp: SignUpResolver,
    signIn: SignInResolver,
  },
  Query: {
    taskColumns: TaskColumnsResolver,
  },
};

export default resolvers;
