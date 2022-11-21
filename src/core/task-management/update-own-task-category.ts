import { getUserDataFromToken } from "core/utils/crypto";
import { PrivateHandlerFactory, BusinessRuleError } from "core/utils/types";
import {
  JsonSchemaErrorMessages,
  JsonSchemaWithCustomErrorMessages,
  validateJsonAgainstJsonSchema,
} from "core/utils/validate-json-schema";
import {
  TaskCategoryModel,
  updateTaskCategory,
  findTaskCategoryById,
} from "database";

export type Dependencies = {
  updateTaskCategory: typeof updateTaskCategory;
  findTaskCategoryById: typeof findTaskCategoryById;
};

export type UpdateOwnTaskCategoryInput = {
  taskCategoryId: string;
  newTaskCategoryName?: string;
};

export type UpdateOwnTaskCategoryOutput = {
  taskCategory: TaskCategoryModel;
};
const errorMessages: JsonSchemaErrorMessages<UpdateOwnTaskCategoryInput> = {
  taskCategoryId: "'taskCategoryId' is an optional string and must be an uuid",
  newTaskCategoryName:
    "'newTaskCategoryName' is an optional string with at most 300 characters",
};
const inputJsonSchema: JsonSchemaWithCustomErrorMessages<UpdateOwnTaskCategoryInput> =
  {
    type: "object",
    // @ts-expect-error
    properties: {
      newTaskCategoryName: {
        type: "string",
        format: "uuid",
      },
      taskCategoryId: {
        type: "string",
        maxLength: 300,
        minLength: 1,
      },
    },
    required: ["taskCategoryId"],
    errorMessage: {
      properties: errorMessages,
      required: errorMessages,
    },
  };

export const updateOwnTaskFactory: PrivateHandlerFactory<
  Dependencies,
  UpdateOwnTaskCategoryInput,
  UpdateOwnTaskCategoryOutput
> =
  ({ updateTaskCategory, findTaskCategoryById }) =>
  async (userToken, input) => {
    validateJsonAgainstJsonSchema(input, inputJsonSchema);
    await getUserDataFromToken(userToken);
    const taskCategory = await findTaskCategoryById(input.taskCategoryId);

    if (!taskCategory) {
      throw new BusinessRuleError("Task Category does not exist");
    }

    const updatedTaskCategory = await updateTaskCategory(input.taskCategoryId, {
      name: input.newTaskCategoryName,
    });
    return { taskCategory: updatedTaskCategory };
  };

export default updateOwnTaskFactory({
  findTaskCategoryById,
  updateTaskCategory,
});
