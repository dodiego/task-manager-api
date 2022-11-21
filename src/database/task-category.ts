import { TaskCategory } from "@prisma/client";
import { logInfo } from "shared/logger";
import { client } from "./client";
import { TaskModel } from "./task";

export type TaskCategoryModel = TaskCategory & { tasks: TaskModel[] };
export async function findTaskCategoryById(
  taskCategoryId: string
): Promise<TaskCategoryModel | null> {
  logInfo("Fetching task category", { taskCategoryId });
  const taskCategory = await client.taskCategory.findUnique({
    where: {
      id: taskCategoryId,
    },
    include: {
      tasks: {
        where: {
          isArchived: false,
        },
      },
    },
  });
  logInfo("Task Category fetched", { taskCategoryId });
  return taskCategory;
}

type CreateTaskCategoryInput = Pick<TaskCategoryModel, "name" | "userId">;
export async function createTaskCategory(
  input: CreateTaskCategoryInput
): Promise<TaskCategoryModel> {
  logInfo("Creating task category", input);
  const taskCategory = await client.taskCategory.create({
    data: {
      name: input.name,
      userId: input.userId,
    },
  });
  logInfo("Task category created", input);

  return { ...taskCategory, tasks: [] };
}

type TaskCategoryUpdatableFields = Pick<Partial<TaskCategoryModel>, "name">;
export async function updateTaskCategory(
  taskCategoryId: string,
  fields: TaskCategoryUpdatableFields
): Promise<TaskCategoryModel> {
  logInfo("Updating task category", { taskCategoryId, ...fields });
  const taskCategory = await client.taskCategory.update({
    data: {
      name: fields.name,
    },
    where: {
      id: taskCategoryId,
    },
  });
  logInfo("Task category updated", { taskCategoryId, ...fields });
  return { ...taskCategory, tasks: [] };
}

export async function removeTaskCategory(
  taskCategoryId: string
): Promise<TaskCategoryModel> {
  logInfo("Removing task category", { taskCategoryId });
  const taskCategory = await client.taskCategory.delete({
    where: {
      id: taskCategoryId,
    },
  });
  logInfo("Removed task category", { taskCategoryId });
  return { ...taskCategory, tasks: [] };
}

export async function findTaskCategoriesAndTasksByUserId(
  userId: string
): Promise<TaskCategoryModel[]> {
  logInfo("Fetching task categories", { userId });
  const taskCategories = await client.taskCategory.findMany({
    where: {
      userId,
    },
    include: {
      tasks: {
        where: {
          isArchived: false,
        },
      },
    },
  });
  logInfo("Fetched task categories", { userId });
  return taskCategories;
}
