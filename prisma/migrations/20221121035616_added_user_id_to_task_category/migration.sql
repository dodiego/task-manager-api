/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `task_categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `task_categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "task_categories" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "task_categories_id_userId_key" ON "task_categories"("id", "userId");

-- AddForeignKey
ALTER TABLE "task_categories" ADD CONSTRAINT "task_categories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
