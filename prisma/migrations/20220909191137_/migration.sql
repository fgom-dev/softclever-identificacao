/*
  Warnings:

  - A unique constraint covering the columns `[inscricaoEstadual]` on the table `empresas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nomeDoBanco]` on the table `empresas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `empresas_inscricaoEstadual_key` ON `empresas`(`inscricaoEstadual`);

-- CreateIndex
CREATE UNIQUE INDEX `empresas_nomeDoBanco_key` ON `empresas`(`nomeDoBanco`);
