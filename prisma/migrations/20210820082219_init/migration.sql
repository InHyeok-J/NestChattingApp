-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(30) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `imgUrl` VARCHAR(191),
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3),

    UNIQUE INDEX `users.email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
