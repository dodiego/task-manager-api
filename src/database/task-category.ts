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
    include: {
      tasks: true,
    },
  });

  return taskCategory;
}
