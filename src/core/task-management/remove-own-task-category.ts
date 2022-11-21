import { getUserDataFromToken } from "core/utils/crypto";
import { PrivateHandlerFactory, BusinessRuleError } from "core/utils/types";
import {
  JsonSchemaErrorMessages,
  JsonSchemaWithCustomErrorMessages,
  validateJsonAgainstJsonSchema,
} from "core/utils/validate-json-schema";
import {
  TaskCategoryModel,
  removeTaskCategory,
  findTaskCategoryById,
} from "database";

export type Dependencies = {
  removeTaskCategory: typeof removeTaskCategory;
  findTaskCategoryById: typeof findTaskCategoryById;
};

export type RemoveOwnTaskCategoryInput = {
  taskCategoryId: string;
};

export type RemoveOwnTaskCategoryOutput = {
  taskCategory: TaskCategoryModel;
};
const errorMessages: JsonSchemaErrorMessages<RemoveOwnTaskCategoryInput> = {
  taskCategoryId: "'taskCategoryId' is a required string and must be an uuid",
};
const inputJsonSchema: JsonSchemaWithCustomErrorMessages<RemoveOwnTaskCategoryInput> =
  {
    type: "object",
    properties: {
      taskCategoryId: {
        type: "string",
        format: "uuid",
      },
    },
    required: ["taskCategoryId"],
    errorMessage: {
      properties: errorMessages,
      required: errorMessages,
    },
  };

export const removeOwnTaskCategoryFactory: PrivateHandlerFactory<
  Dependencies,
  RemoveOwnTaskCategoryInput,
  RemoveOwnTaskCategoryOutput
> =
  ({ findTaskCategoryById, removeTaskCategory }) =>
  async (userToken, input) => {
    validateJsonAgainstJsonSchema(input, inputJsonSchema);
    await getUserDataFromToken(userToken);
    const taskCategory = await findTaskCategoryById(input.taskCategoryId);

    if (!taskCategory) {
      throw new BusinessRuleError("Task Category does not exist");
    }

    await removeTaskCategory(input.taskCategoryId);
    return { taskCategory };
  };

export default removeOwnTaskCategoryFactory({
  findTaskCategoryById,
  removeTaskCategory,
});
