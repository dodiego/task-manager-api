-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('ToDo', 'InProgress', 'Done');

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(300) NOT NULL,
    "description" VARCHAR(6000),
    "task_category_id" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "userId" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_categories" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(300) NOT NULL,

    CONSTRAINT "task_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(600) NOT NULL,
    "password" VARCHAR(1000) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_task_category_id_fkey" FOREIGN KEY ("task_category_id") REFERENCES "task_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
