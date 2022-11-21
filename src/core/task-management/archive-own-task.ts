import { getUserDataFromToken } from "core/utils/crypto";
import { PrivateHandlerFactory, BusinessRuleError } from "core/utils/types";
import {
  JsonSchemaErrorMessages,
  JsonSchemaWithCustomErrorMessages,
  validateJsonAgainstJsonSchema,
} from "core/utils/validate-json-schema";
import { TaskModel, updateTask, findTaskById } from "database";

export type Dependencies = {
  updateTask: typeof updateTask;
  findTaskById: typeof findTaskById;
};

export type ArchiveOwnTaskInput = {
  taskId: string;
};

export type ArchiveOwnTaskOutput = {
  task: TaskModel;
};
const errorMessages: JsonSchemaErrorMessages<ArchiveOwnTaskInput> = {
  taskId: "'taskId' is a required string and must be an uuid",
};
const inputJsonSchema: JsonSchemaWithCustomErrorMessages<ArchiveOwnTaskInput> =
  {
    type: "object",
    properties: {
      taskId: {
        type: "string",
        format: "uuid",
      },
    },
    required: ["taskId"],
    errorMessage: {
      properties: errorMessages,
      required: errorMessages,
    },
  };

export const archiveOwnTaskFactory: PrivateHandlerFactory<
  Dependencies,
  ArchiveOwnTaskInput,
  ArchiveOwnTaskOutput
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
      isArchived: true,
    });
    return { task: updatedTask };
  };

export default archiveOwnTaskFactory({ findTaskById, updateTask });
