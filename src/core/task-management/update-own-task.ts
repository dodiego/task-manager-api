import { getUserDataFromToken } from "core/utils/crypto";
import { PrivateHandlerFactory, BusinessRuleError } from "core/utils/types";
import {
  JsonSchemaErrorMessages,
  JsonSchemaWithCustomErrorMessages,
  validateJsonAgainstJsonSchema,
} from "core/utils/validate-json-schema";
import { TaskModel, updateTask, findTaskById, TaskStatus } from "database";

export type Dependencies = {
  updateTask: typeof updateTask;
  findTaskById: typeof findTaskById;
};

export type UpdateOwnTaskInput = {
  taskId: string;
  newTaskTitle?: string;
  newTaskDescription?: string;
  newTaskCategoryId?: string;
  newTaskStatus?: TaskStatus;
};

export type UpdateOwnTaskOutput = {
  task: TaskModel;
};
const errorMessages: JsonSchemaErrorMessages<UpdateOwnTaskInput> = {
  newTaskCategoryId:
    "'newTaskCategoryId' is an optional string and must be an uuid",
  newTaskDescription:
    "'newTaskDescription' is an optional string with at most 6000 characters",
  newTaskTitle:
    "'newTaskTitle' is an optional string with at least 1 character and at most 300 characters",
  taskId: "'taskId' is a required string and must be an uuid",
  newTaskStatus: `'newTaskStatus' must be one of the following values: ${Object.values(
    TaskStatus
  )
    .map((value) => `"${value}"`)
    .join(", ")}`,
};
const inputJsonSchema: JsonSchemaWithCustomErrorMessages<UpdateOwnTaskInput> = {
  type: "object",
  properties: {
    taskId: {
      type: "string",
      format: "uuid",
    },
    newTaskCategoryId: {
      type: "string",
      format: "uuid",
    },
    newTaskDescription: {
      type: "string",
      maxLength: 6000,
      nullable: true,
    },
    // @ts-expect-error
    newTaskStatus: {
      type: "string",
      enum: Object.values(TaskStatus),
    },
    // @ts-expect-error
    newTaskTitle: {
      type: "string",
      maxLength: 300,
      minLength: 1,
    },
  },
  required: ["taskId"],
  errorMessage: {
    properties: errorMessages,
    required: errorMessages,
  },
};

export const updateOwnTaskFactory: PrivateHandlerFactory<
  Dependencies,
  UpdateOwnTaskInput,
  UpdateOwnTaskOutput
> =
  ({ updateTask, findTaskById }) =>
  async (userToken, input) => {
    validateJsonAgainstJsonSchema(input, inputJsonSchema);
    await getUserDataFromToken(userToken);
    const task = await findTaskById(input.taskId);

    if (!task) {
      throw new BusinessRuleError("Task does not exist");
    }

    const updatedTask = await updateTask(input.taskId, {
      title: input.newTaskTitle,
      description: input.newTaskDescription!,
      taskCategoryId: input.newTaskCategoryId,
      status: input.newTaskStatus,
    });
    return { task: updatedTask };
  };

export default updateOwnTaskFactory({ findTaskById, updateTask });
