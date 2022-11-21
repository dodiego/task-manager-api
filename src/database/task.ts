import { Task } from "@prisma/client";
import { logInfo } from "shared/logger";
import { client } from "./client";

export type TaskModel = Task;
export enum TaskStatus {
  ToDo = "ToDo",
  InProgress = "InProgress",
  Done = "Done",
}
type CreateTaskInput = Pick<
  TaskModel,
  "title" | "description" | "taskCategoryId" | "userId"
>;
export async function createTask(input: CreateTaskInput): Promise<TaskModel> {
  logInfo("Creating new Task", input);
  const task = await client.task.create({
    data: {
      title: input.title,
      description: input.description,
      taskCategoryId: input.taskCategoryId,
      userId: input.userId,
      status: TaskStatus.ToDo,
    },
  });
  logInfo("Task created");

  return task;
}

type TaskUpdatableFields = Pick<
  Partial<TaskModel>,
  "title" | "description" | "taskCategoryId" | "status" | "isArchived"
>;
export async function updateTask(
  taskId: string,
  fields: TaskUpdatableFields
): Promise<TaskModel> {
  const task = await client.task.update({
    data: {
      title: fields.title,
      description: fields.description,
      taskCategoryId: fields.taskCategoryId,
      status: fields.status,
      isArchived: fields.isArchived,
    },
    where: {
      id: taskId,
    },
  });

  return task;
}

export async function findTaskById(taskId: string): Promise<TaskModel | null> {
  const task = await client.task.findUnique({
    where: {
      id: taskId,
    },
  });

  return task;
}
