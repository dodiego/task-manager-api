import { getUserDataFromToken } from "core/utils/crypto";
import { PrivateHandlerFactory } from "core/utils/types";
import {
  JsonSchemaErrorMessages,
  JsonSchemaWithCustomErrorMessages,
  validateJsonAgainstJsonSchema,
} from "core/utils/validate-json-schema";
import { createTaskCategory, TaskCategoryModel } from "database";

export type Dependencies = {
  createTaskCategory: typeof createTaskCategory;
};

export type CreateOwnTaskCategoryInput = {
  taskCategoryName: string;
};

export type CreateOwnTaskCategoryOutput = {
  taskCategory: TaskCategoryModel;
};
const errorMessages: JsonSchemaErrorMessages<CreateOwnTaskCategoryInput> = {
  taskCategoryName:
    "'taskCategoryName' is a required string with at least 1 character and at most 300 characters",
};
const inputJsonSchema: JsonSchemaWithCustomErrorMessages<CreateOwnTaskCategoryInput> =
  {
    type: "object",
    properties: {
      taskCategoryName: {
        type: "string",
        maxLength: 300,
        minLength: 1,
      },
    },
    required: ["taskCategoryName"],
    errorMessage: {
      properties: errorMessages,
      required: errorMessages,
    },
  };

export const createOwnTaskCategoryFactory: PrivateHandlerFactory<
  Dependencies,
  CreateOwnTaskCategoryInput,
  CreateOwnTaskCategoryOutput
> =
  ({ createTaskCategory }) =>
  async (userToken, input) => {
    validateJsonAgainstJsonSchema(input, inputJsonSchema);
    const { userId } = await getUserDataFromToken(userToken);

    const taskCategory = await createTaskCategory({
      name: input.taskCategoryName,
      userId,
    });
    return { taskCategory };
  };

export default createOwnTaskCategoryFactory({ createTaskCategory });
