/*
  Warnings:

  - Added the required column `rank` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skill1` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skill2` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skill3` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skill4` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skill5` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pokemon" ADD COLUMN     "rank" INTEGER NOT NULL,
ADD COLUMN     "skill1" TEXT NOT NULL,
ADD COLUMN     "skill2" TEXT NOT NULL,
ADD COLUMN     "skill3" TEXT NOT NULL,
ADD COLUMN     "skill4" TEXT NOT NULL,
ADD COLUMN     "skill5" TEXT NOT NULL;
