/*
  Warnings:

  - You are about to alter the column `descricao` on the `enderecos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.
  - You are about to alter the column `logradouro` on the `enderecos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.
  - You are about to alter the column `complemento` on the `enderecos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.
  - You are about to alter the column `senha` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(191)`.
  - You are about to drop the `Contato` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Grupo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsuarioGrupo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Contato` DROP FOREIGN KEY `Contato_empresaId_fkey`;

-- DropForeignKey
ALTER TABLE `Grupo` DROP FOREIGN KEY `Grupo_empresaId_fkey`;

-- DropForeignKey
ALTER TABLE `UsuarioGrupo` DROP FOREIGN KEY `UsuarioGrupo_grupoId_fkey`;

-- DropForeignKey
ALTER TABLE `UsuarioGrupo` DROP FOREIGN KEY `UsuarioGrupo_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `empresas` MODIFY `cnpj` VARCHAR(191) NOT NULL,
    MODIFY `razaoSocial` VARCHAR(191) NOT NULL,
    MODIFY `fantasia` VARCHAR(191) NULL,
    MODIFY `regimeTributario` VARCHAR(191) NOT NULL,
    MODIFY `inscricaoEstadual` VARCHAR(191) NOT NULL,
    MODIFY `situacao` VARCHAR(191) NULL DEFAULT '1';

-- AlterTable
ALTER TABLE `enderecos` MODIFY `descricao` VARCHAR(191) NOT NULL,
    MODIFY `logradouro` VARCHAR(191) NOT NULL,
    MODIFY `numero` VARCHAR(191) NOT NULL,
    MODIFY `complemento` VARCHAR(191) NULL,
    MODIFY `bairro` VARCHAR(191) NOT NULL,
    MODIFY `municipio` VARCHAR(191) NOT NULL,
    MODIFY `codMunicipio` VARCHAR(191) NOT NULL,
    MODIFY `UF` VARCHAR(191) NOT NULL,
    MODIFY `cep` VARCHAR(191) NOT NULL,
    MODIFY `situacao` VARCHAR(191) NULL DEFAULT '1';

-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `admin` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `nome` VARCHAR(191) NOT NULL,
    MODIFY `sobrenome` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `senha` VARCHAR(191) NOT NULL,
    MODIFY `celular` VARCHAR(191) NOT NULL,
    MODIFY `situacao` VARCHAR(191) NULL DEFAULT '1';

-- DropTable
DROP TABLE `Contato`;

-- DropTable
DROP TABLE `Grupo`;

-- DropTable
DROP TABLE `UsuarioGrupo`;

-- CreateTable
CREATE TABLE `contatos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `contato` VARCHAR(191) NOT NULL,
    `situacao` VARCHAR(191) NULL DEFAULT '1',
    `empresaId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `contatos` ADD CONSTRAINT `contatos_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `usuarios` RENAME INDEX `celular_UNIQUE` TO `usuarios_celular_key`;

-- RenameIndex
ALTER TABLE `usuarios` RENAME INDEX `email_UNIQUE` TO `usuarios_email_key`;
