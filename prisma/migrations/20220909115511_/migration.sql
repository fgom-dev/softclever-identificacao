/*
  Warnings:

  - Added the required column `nomeDoBanco` to the `empresas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `empresas` ADD COLUMN `nomeDoBanco` VARCHAR(191) NOT NULL;
