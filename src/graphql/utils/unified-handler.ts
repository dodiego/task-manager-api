import { AuthenticationError } from "core/utils/crypto";
import { BusinessRuleError } from "core/utils/types";
import { ValidationError } from "core/utils/validate-json-schema";
import { ResolversTypes } from "graphql/generated/graphql-types";
import { logError } from "shared/logger";

function handleBasicErrors(
  error: Error
):
  | ResolversTypes["ValidationError"]
  | ResolversTypes["BusinessRuleError"]
  | ResolversTypes["UnknownError"] {
  if (error instanceof ValidationError) {
    return {
      __typename: "ValidationError",
      message: error.message,
    };
  }
  if (error instanceof BusinessRuleError) {
    return {
      __typename: "BusinessRuleError",
      message: error.message,
    };
  }
  logError(error);
  return {
    __typename: "UnknownError",
    message: "An unknown error occurred",
  };
}

export async function PublicGraphQlResolverHandler<TSuccessOutput>(
  handler: () => Promise<TSuccessOutput>
): Promise<
  | TSuccessOutput
  | ResolversTypes["ValidationError"]
  | ResolversTypes["BusinessRuleError"]
  | ResolversTypes["UnknownError"]
> {
  try {
    const result = await handler();
    return result;
  } catch (error) {
    return await handleBasicErrors(error);
  }
}

export async function PrivateGraphQlResolverHandler<TSuccessOutput>(
  handler: () => Promise<TSuccessOutput>
): Promise<
  | TSuccessOutput
  | ResolversTypes["ValidationError"]
  | ResolversTypes["AuthenticationError"]
  | ResolversTypes["BusinessRuleError"]
  | ResolversTypes["UnknownError"]
> {
  try {
    const result = await handler();
    return result;
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return {
        __typename: "AuthenticationError",
        message: error.message,
      };
    }
    return await handleBasicErrors(error);
  }
}
