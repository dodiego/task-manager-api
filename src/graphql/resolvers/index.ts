import { Resolvers } from "graphql/generated/graphql-types";
import { CreateTaskResolver } from "./create-task";
import { SignInResolver } from "./sign-in";
import { SignUpResolver } from "./sign-up";

const resolvers: Resolvers = {
  Mutation: {
    createTask: CreateTaskResolver,
    signUp: SignUpResolver,
    signIn: SignInResolver,
  },
};

export default resolvers;
