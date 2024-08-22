/*
  Warnings:

  - You are about to drop the column `attack` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `defence` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `hp` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `spAttack` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `spDefence` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `speed` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `type1` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `type2` on the `Pokemon` table. All the data in the column will be lost.
  - Added the required column `type` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "attack",
DROP COLUMN "defence",
DROP COLUMN "hp",
DROP COLUMN "spAttack",
DROP COLUMN "spDefence",
DROP COLUMN "speed",
DROP COLUMN "type1",
DROP COLUMN "type2",
ADD COLUMN     "type" TEXT NOT NULL;
