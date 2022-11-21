import { getUserDataFromToken } from "core/utils/crypto";
import { PrivateHandlerFactory, BusinessRuleError } from "core/utils/types";
import {
  JsonSchemaErrorMessages,
  JsonSchemaWithCustomErrorMessages,
  validateJsonAgainstJsonSchema,
} from "core/utils/validate-json-schema";
import { TaskModel, createTask, findTaskCategoryById } from "database";
import { logWarning } from "shared/logger";

export type Dependencies = {
  createTask: typeof createTask;
  findTaskCategoryById: typeof findTaskCategoryById;
};

export type CreateOwnTaskInput = {
  taskTitle: string;
  taskDescription?: string;
  taskCategoryId: string;
};

export type CreateOwnTaskOutput = {
  task: TaskModel;
};
const errorMessages: JsonSchemaErrorMessages<CreateOwnTaskInput> = {
  taskCategoryId: "'taskCategoryId' is a required string and must be an uuid",
  taskDescription:
    "'taskDescription' is an optional string with at most 6000 characters",
  taskTitle:
    "'taskTitle' is a required string with at least 1 character and at most 300 characters",
};
const inputJsonSchema: JsonSchemaWithCustomErrorMessages<CreateOwnTaskInput> = {
  type: "object",
  properties: {
    taskCategoryId: {
      type: "string",
      format: "uuid",
    },
    taskDescription: {
      type: "string",
      maxLength: 6000,
      nullable: true,
    },
    taskTitle: {
      type: "string",
      maxLength: 300,
      minLength: 1,
    },
  },
  required: ["taskCategoryId", "taskTitle"],
  errorMessage: {
    properties: errorMessages,
    required: errorMessages,
  },
};

export const createOwnTaskFactory: PrivateHandlerFactory<
  Dependencies,
  CreateOwnTaskInput,
  CreateOwnTaskOutput
> =
  ({ createTask, findTaskCategoryById }) =>
  async (userToken, input) => {
    validateJsonAgainstJsonSchema(input, inputJsonSchema);
    const { userId } = await getUserDataFromToken(userToken);
    const taskCategory = await findTaskCategoryById(input.taskCategoryId);

    if (!taskCategory) {
      throw new BusinessRuleError("Task Category does not exist");
    }

    if (taskCategory.userId !== userId) {
      logWarning("Attempt to create task with non-owned task category", {
        userId,
        taskCategoryId: taskCategory.id,
      });
      throw new BusinessRuleError("You are not allowed to perform this action");
    }

    const task = await createTask({
      title: input.taskTitle,
      description: input.taskDescription!,
      taskCategoryId: input.taskCategoryId,
      userId,
    });
    return { task };
  };

export default createOwnTaskFactory({ createTask, findTaskCategoryById });
