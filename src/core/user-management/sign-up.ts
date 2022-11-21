import { generateAccessToken, hashString } from "core/utils/crypto";
import { BusinessRuleError, PublicHandlerFactory } from "core/utils/types";
import {
  JsonSchemaErrorMessages,
  JsonSchemaWithCustomErrorMessages,
  validateJsonAgainstJsonSchema,
  ValidationError,
} from "core/utils/validate-json-schema";
import { createUser, findUserByEmail } from "database";

export type Dependencies = {
  createUser: typeof createUser;
  findUserByEmail: typeof findUserByEmail;
};

export type SignUpInput = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignUpOutput = {
  accessToken: string;
};
const errorMessages: JsonSchemaErrorMessages<SignUpInput> = {
  email: "'email' is a required string and must be a valid email",
  password:
    "'password' is a required string with at least 6 characters and at most 100 characters",
  confirmPassword:
    "'confirmPassword' is a required string with at least 6 characters and at most 100 characters",
};
const inputJsonSchema: JsonSchemaWithCustomErrorMessages<SignUpInput> = {
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
    confirmPassword: {
      type: "string",
      maxLength: 100,
      minLength: 6,
    },
  },
  required: ["email", "password", "confirmPassword"],
  errorMessage: {
    properties: errorMessages,
    required: errorMessages,
  },
};

export const signUpFactory: PublicHandlerFactory<
  Dependencies,
  SignUpInput,
  SignUpOutput
> =
  ({ createUser, findUserByEmail }) =>
  async (input) => {
    validateJsonAgainstJsonSchema(input, inputJsonSchema);

    if (input.password !== input.confirmPassword) {
      throw new ValidationError("Passwords are not equal");
    }

    const isEmailUsed = await findUserByEmail(input.email);

    if (isEmailUsed) {
      throw new BusinessRuleError("This email is already used.");
    }
    const { hashedInput: hashedPassword } = await hashString(input.password);
    const user = await createUser({
      email: input.email,
      password: hashedPassword,
    });
    const { token: accessToken } = await generateAccessToken({
      userId: user.id,
    });
    return {
      accessToken,
    };
  };

export default signUpFactory({ findUserByEmail, createUser });
