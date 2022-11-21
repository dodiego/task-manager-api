import signUp from "core/user-management/sign-up";
import {
  AuthenticationOutput,
  MutationResolvers,
} from "graphql/generated/graphql-types";
import { PublicGraphQlResolverHandler } from "graphql/utils/unified-handler";

export const SignUpResolver: MutationResolvers["signUp"] = async (
  _,
  { input }
) => {
  const result = await PublicGraphQlResolverHandler<AuthenticationOutput>(
    async () => {
      const { accessToken } = await signUp({
        email: input.email,
        password: input.password,
        confirmPassword: input.confirmPassword,
      });
      return {
        __typename: "AuthenticationOutput",
        accessToken,
      };
    }
  );
  return result;
};
