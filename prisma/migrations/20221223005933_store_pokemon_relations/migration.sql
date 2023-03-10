/*
  Warnings:

  - You are about to drop the column `votedAgainst` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `votedFor` on the `Vote` table. All the data in the column will be lost.
  - Added the required column `votedAgainstId` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `votedForId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE`Vote` RENAME COLUMN `votedAgainst` TO `votedAgainstId`;
ALTER TABLE`Vote` RENAME COLUMN `votedFor` TO `votedForId`;

-- CreateTable
CREATE TABLE `Pokemon` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `spriteUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Vote_votedForId_idx` ON `Vote`(`votedForId`);

-- CreateIndex
CREATE INDEX `Vote_votedAgainstId_idx` ON `Vote`(`votedAgainstId`);

