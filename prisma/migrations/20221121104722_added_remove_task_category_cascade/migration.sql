-- DropForeignKey
ALTER TABLE "task_categories" DROP CONSTRAINT "task_categories_userId_fkey";

-- AddForeignKey
ALTER TABLE "task_categories" ADD CONSTRAINT "task_categories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
