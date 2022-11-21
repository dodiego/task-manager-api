import { TaskCategory } from "@prisma/client";
import { client } from "./client";
import { TaskModel } from "./task";

export type TaskCategoryModel = TaskCategory & { tasks: TaskModel[] };
export async function findTaskCategoryById(
  taskCategoryId: string
): Promise<TaskCategoryModel | null> {
  const taskCategory = await client.taskCategory.findUnique({
    where: {
      id: taskCategoryId,
    },
  });

  if (taskCategory) {
    return { ...taskCategory, tasks: [] };
  }
  return null;
}

type CreateTaskCategoryInput = Pick<TaskCategoryModel, "name" | "userId">;
export async function createTaskCategory(
  input: CreateTaskCategoryInput
): Promise<TaskCategoryModel> {
  const taskCategory = await client.taskCategory.create({
    data: {
      name: input.name,
      userId: input.userId,
    },
  });

  return { ...taskCategory, tasks: [] };
}

type TaskCategoryUpdatableFields = Pick<Partial<TaskCategoryModel>, "name">;
export async function updateTaskCategory(
  taskCategoryId: string,
  fields: TaskCategoryUpdatableFields
): Promise<TaskCategoryModel> {
  const taskCategory = await client.taskCategory.update({
    data: {
      name: fields.name,
    },
    where: {
      id: taskCategoryId,
    },
  });

  return { ...taskCategory, tasks: [] };
}

export async function removeTaskCategory(
  taskCategoryId: string
): Promise<TaskCategoryModel> {
  const taskCategory = await client.taskCategory.delete({
    where: {
      id: taskCategoryId,
    },
  });

  return { ...taskCategory, tasks: [] };
}

export async function findTaskCategoriesAndTasksByUserId(
  userId: string
): Promise<TaskCategoryModel[]> {
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

  return taskCategories;
}
