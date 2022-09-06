-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `email` VARCHAR(60) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `cellPhone` VARCHAR(11) NOT NULL,
    `status` INTEGER NOT NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    UNIQUE INDEX `celular_UNIQUE`(`cellPhone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
