-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sun_bakery
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sun_bakery
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sun_bakery` DEFAULT CHARACTER SET utf8 ;
USE `sun_bakery` ;

-- -----------------------------------------------------
-- Table `sun_bakery`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sun_bakery`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NULL,
  `email` VARCHAR(150) NULL,
  `matricula` VARCHAR(45) NULL,
  `role` ENUM("ADMIN", "EMPLOYEE", "CONSUMER") NULL,
  `telefone` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sun_bakery`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sun_bakery`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `ingredientes` VARCHAR(45) NOT NULL,
  `preco` DECIMAL NULL,
  `isGlutenFree` TINYINT(1) NULL,
  `isVegan` TINYINT(1) NULL,
  `users_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_products_users_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_products_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `sun_bakery`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sun_bakery`.`favorites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sun_bakery`.`favorites` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `products_id` INT NOT NULL,
  `users_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_favorites_products1_idx` (`products_id` ASC) VISIBLE,
  INDEX `fk_favorites_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_favorites_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `sun_bakery`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_favorites_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `sun_bakery`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
