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
import { logWarning } from "shared/logger";

export type Dependencies = {
  updateTaskCategory: typeof updateTaskCategory;
  findTaskCategoryById: typeof findTaskCategoryById;
};

export type UpdateOwnTaskCategoryInput = {
  taskCategoryId: string;
  newTaskCategoryName: string;
};

export type UpdateOwnTaskCategoryOutput = {
  taskCategory: TaskCategoryModel;
};
const errorMessages: JsonSchemaErrorMessages<UpdateOwnTaskCategoryInput> = {
  taskCategoryId: "'taskCategoryId' is an optional string and must be an uuid",
  newTaskCategoryName:
    "'newTaskCategoryName' is a required string with at least 1 character and at most 300 characters",
};
const inputJsonSchema: JsonSchemaWithCustomErrorMessages<UpdateOwnTaskCategoryInput> =
  {
    type: "object",
    properties: {
      newTaskCategoryName: {
        type: "string",
        maxLength: 300,
        minLength: 1,
      },
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

export const updateOwnTaskCategoryFactory: PrivateHandlerFactory<
  Dependencies,
  UpdateOwnTaskCategoryInput,
  UpdateOwnTaskCategoryOutput
> =
  ({ updateTaskCategory, findTaskCategoryById }) =>
  async (userToken, input) => {
    validateJsonAgainstJsonSchema(input, inputJsonSchema);
    const { userId } = await getUserDataFromToken(userToken);
    const taskCategory = await findTaskCategoryById(input.taskCategoryId);

    if (!taskCategory) {
      throw new BusinessRuleError("Task Category does not exist");
    }

    if (taskCategory.userId !== userId) {
      logWarning("Attempt to update non-owned task category", {
        userId,
        taskCategoryId: taskCategory.id,
      });
      throw new BusinessRuleError("You are not allowed to perform this action");
    }

    const updatedTaskCategory = await updateTaskCategory(input.taskCategoryId, {
      name: input.newTaskCategoryName,
    });
    return { taskCategory: updatedTaskCategory };
  };

export default updateOwnTaskCategoryFactory({
  findTaskCategoryById,
  updateTaskCategory,
});
