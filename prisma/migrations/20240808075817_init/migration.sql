/*
  Warnings:

  - You are about to drop the column `level` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Pokemon` table. All the data in the column will be lost.
  - Added the required column `ability1` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ability2` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ability3` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anotherName` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attack` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defence` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hp` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spAttack` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spDefence` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speed` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `src` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type1` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type2` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "level",
DROP COLUMN "ownerId",
DROP COLUMN "type",
ADD COLUMN     "ability1" TEXT NOT NULL,
ADD COLUMN     "ability2" TEXT NOT NULL,
ADD COLUMN     "ability3" TEXT NOT NULL,
ADD COLUMN     "anotherName" TEXT NOT NULL,
ADD COLUMN     "attack" INTEGER NOT NULL,
ADD COLUMN     "defence" INTEGER NOT NULL,
ADD COLUMN     "hp" INTEGER NOT NULL,
ADD COLUMN     "spAttack" INTEGER NOT NULL,
ADD COLUMN     "spDefence" INTEGER NOT NULL,
ADD COLUMN     "speed" INTEGER NOT NULL,
ADD COLUMN     "src" TEXT NOT NULL,
ADD COLUMN     "type1" TEXT NOT NULL,
ADD COLUMN     "type2" TEXT NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;
