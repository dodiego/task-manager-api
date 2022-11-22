import { generateAccessToken, verifyHash } from "core/utils/crypto";
import { BusinessRuleError, PublicHandlerFactory } from "core/utils/types";
import {
  JsonSchemaErrorMessages,
  JsonSchemaWithCustomErrorMessages,
  validateJsonAgainstJsonSchema,
} from "core/utils/validate-json-schema";
import { findUserByEmail } from "database";

export type Dependencies = {
  findUserByEmail: typeof findUserByEmail;
  verifyHash: typeof verifyHash;
  generateAccessToken: typeof generateAccessToken;
};

export type SignInInput = {
  email: string;
  password: string;
};

export type SignInOutput = {
  accessToken: string;
};
const errorMessages: JsonSchemaErrorMessages<SignInInput> = {
  email: "'email' is a required string and must be a valid email",
  password:
    "'password' is a required string with at least 6 characters and at most 100 characters",
};
const inputJsonSchema: JsonSchemaWithCustomErrorMessages<SignInInput> = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      maxLength: 100,
      minLength: 6,
    },
  },
  required: ["email", "password"],
  errorMessage: {
    properties: errorMessages,
    required: errorMessages,
  },
};

export const signInFactory: PublicHandlerFactory<
  Dependencies,
  SignInInput,
  SignInOutput
> =
  ({ findUserByEmail, generateAccessToken, verifyHash }) =>
  async (input) => {
    validateJsonAgainstJsonSchema(input, inputJsonSchema);

    const user = await findUserByEmail(input.email);

    if (!user) {
      throw new BusinessRuleError("Invalid email / password combination");
    }

    const isPasswordValid = await verifyHash({
      hashedString: user.password,
      originalString: input.password,
    });

    if (!isPasswordValid) {
      throw new BusinessRuleError("Invalid email / password combination");
    }

    const { token: accessToken } = await generateAccessToken({
      userId: user.id,
    });
    return {
      accessToken,
    };
  };

export default signInFactory({
  findUserByEmail,
  generateAccessToken,
  verifyHash,
});
