/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(20) NOT NULL,
    `sobrenome` VARCHAR(50) NOT NULL,
    `email` VARCHAR(60) NOT NULL,
    `senha` VARCHAR(200) NOT NULL,
    `celular` VARCHAR(11) NOT NULL,
    `situacao` CHAR(1) NOT NULL DEFAULT '1',
    `dhCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dhAtualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `email_UNIQUE`(`email`),
    UNIQUE INDEX `celular_UNIQUE`(`celular`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empresas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cnpj` VARCHAR(14) NOT NULL,
    `razaoSocial` VARCHAR(150) NOT NULL,
    `fantasia` VARCHAR(150) NULL,
    `regimeTributario` CHAR(1) NOT NULL,
    `inscricaoEstadual` VARCHAR(15) NOT NULL,
    `situacao` CHAR(1) NOT NULL,
    `dhCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dhAtualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enderecos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(250) NOT NULL,
    `logradouro` VARCHAR(250) NOT NULL,
    `numero` VARCHAR(20) NOT NULL,
    `complemento` VARCHAR(250) NULL,
    `bairro` VARCHAR(150) NOT NULL,
    `municipio` VARCHAR(150) NOT NULL,
    `codMunicipio` CHAR(7) NOT NULL,
    `UF` CHAR(2) NOT NULL,
    `cep` CHAR(8) NOT NULL,
    `dhCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dhAtualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `situacao` CHAR(1) NOT NULL,
    `empresaId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contato` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(250) NOT NULL,
    `contato` VARCHAR(150) NOT NULL,
    `situacao` CHAR(1) NOT NULL,
    `empresaId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `enderecos` ADD CONSTRAINT `enderecos_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contato` ADD CONSTRAINT `Contato_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
