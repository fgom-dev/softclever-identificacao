/*
  Warnings:

  - You are about to drop the column `celular` on the `usuarios` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fone]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fone` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `usuarios_celular_key` ON `usuarios`;

-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `celular`,
    ADD COLUMN `fone` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `usuarios_fone_key` ON `usuarios`(`fone`);
