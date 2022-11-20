import { getUserDataFromToken } from "auth";
import { PrivateHandlerFactory } from "core/shared/base";
import {
  JsonSchemaErrorMessages,
  JsonSchemaWithCustomErrorMessages,
  validateJsonAgainstJsonSchema,
} from "core/shared/validate-json-schema";
import { TaskModel, createTask } from "database";

export type Dependencies = {
  createTask: typeof createTask;
  getUserDataFromToken: typeof getUserDataFromToken;
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
    "'taskTitle' is a required string with have at least 1 character and at most 300 characters",
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
  ({ createTask, getUserDataFromToken }) =>
  async (userToken, input) => {
    validateJsonAgainstJsonSchema(input, inputJsonSchema);
    const { userId } = await getUserDataFromToken(userToken);
    const task = await createTask({
      title: input.taskTitle,
      description: input.taskDescription!,
      taskCategoryId: input.taskCategoryId,
      userId,
    });
    return { task };
  };

export default createOwnTaskFactory({ createTask, getUserDataFromToken });