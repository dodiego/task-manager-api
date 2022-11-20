import { Task, TaskStatus } from "@prisma/client";
import { client } from "./client";

export type TaskModel = Task;

type CreateTaskInput = Pick<
  TaskModel,
  "title" | "description" | "taskCategoryId" | "userId"
>;
export async function createTask(input: CreateTaskInput): Promise<TaskModel> {
  const task = client.task.create({
    data: {
      title: input.title,
      description: input.description,
      taskCategoryId: input.taskCategoryId,
      userId: input.userId,
      status: TaskStatus.ToDo,
    },
  });

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
  const task = client.task.update({
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
