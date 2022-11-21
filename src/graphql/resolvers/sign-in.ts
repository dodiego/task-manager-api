import signIn from "core/user-management/sign-in";
import {
  AuthenticationOutput,
  MutationResolvers,
} from "graphql/generated/graphql-types";
import { PublicGraphQlResolverHandler } from "graphql/utils/unified-handler";

export const SignInResolver: MutationResolvers["signIn"] = async (
  _,
  { input }
) => {
  const result = await PublicGraphQlResolverHandler<AuthenticationOutput>(
    async () => {
      const { accessToken } = await signIn({
        email: input.email,
        password: input.password,
      });
      return {
        __typename: "AuthenticationOutput",
        accessToken,
      };
    }
  );
  return result;
};
