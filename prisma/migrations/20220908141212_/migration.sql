/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `empresas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `usuariosEmpresas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `empresaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `empresas_cnpj_key` ON `empresas`(`cnpj`);

-- AddForeignKey
ALTER TABLE `usuariosEmpresas` ADD CONSTRAINT `usuariosEmpresas_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuariosEmpresas` ADD CONSTRAINT `usuariosEmpresas_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
