import Ajv, { JSONSchemaType, ValidateFunction } from "ajv";
import addFormats, { FormatName } from "ajv-formats";
import addCustomErrorMessages from "ajv-errors";
import { logInfo } from "shared/logger";
import { PlainJson } from "shared/types";
type JsonSchemaWithFormats<T> = JSONSchemaType<T> & {
  type: "object";
  properties: {
    [key in keyof T]?: {
      format?: FormatName;
    };
  };
};
export type JsonSchemaErrorMessages<T> = {
  [key in keyof T]: string;
};
export type JsonSchemaWithCustomErrorMessages<T> = JsonSchemaWithFormats<T> & {
  errorMessage: {
    properties: JsonSchemaErrorMessages<T>;
    required: JsonSchemaErrorMessages<T>;
  };
};
export class ValidationError extends Error {}

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
addCustomErrorMessages(ajv);
const validators: { [key: string]: ValidateFunction } = {};

function validate<T extends PlainJson>(validator: ValidateFunction, input: T) {
  logInfo("Validating input", input);
  const success = validator(input);

  if (!success) {
    throw new ValidationError(
      validator.errors!.map((error) => error.message).join("\n")
    );
  }
}

export function validateJsonAgainstJsonSchema<T extends PlainJson>(
  input: T,
  jsonSchema: JsonSchemaWithCustomErrorMessages<T>
) {
  const stringifiedJsonSchema = JSON.stringify(jsonSchema);
  if (!validators[stringifiedJsonSchema]) {
    validators[stringifiedJsonSchema] = ajv.compile(jsonSchema);
  }

  const validator = validators[stringifiedJsonSchema];

  validate(validator, input);
}
