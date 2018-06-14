-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema eotp
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema eotp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eotp` DEFAULT CHARACTER SET utf8 ;
USE `eotp` ;

-- -----------------------------------------------------
-- Table `eotp`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eotp`.`User` (
  `Username` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Password` TEXT NOT NULL,
  `PrimeiroNome` VARCHAR(45) NOT NULL,
  `UltimoNome` VARCHAR(45) NOT NULL,
  `Telemovel` INT NOT NULL,
  `Cartao` VARCHAR(45) NULL,
  `Plafond` INT NOT NULL,
  PRIMARY KEY (`Username`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eotp`.`Portfolio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eotp`.`Portfolio` (
  `Portfolio` INT NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Portfolio`),
  INDEX `fk_Portfolio_User1_idx` (`Username` ASC),
  CONSTRAINT `fk_Portfolio_User1`
    FOREIGN KEY (`Username`)
    REFERENCES `eotp`.`User` (`Username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eotp`.`Ativo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eotp`.`Ativo` (
  `Nome` VARCHAR(45) NULL,
  `Unidades` VARCHAR(45) NULL,
  `Investimento` VARCHAR(45) NULL,
  `ValorPosicao` VARCHAR(45) NULL,
  `Portfolio` INT NOT NULL,
  INDEX `fk_Ativo_Portfolio1_idx` (`Portfolio` ASC),
  CONSTRAINT `fk_Ativo_Portfolio1`
    FOREIGN KEY (`Portfolio`)
    REFERENCES `eotp`.`Portfolio` (`Portfolio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eotp`.`History`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eotp`.`History` (
  `History` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NOT NULL,
  `Investimento` VARCHAR(45) NOT NULL,
  `Abertura` VARCHAR(45) NOT NULL,
  `Fecho` VARCHAR(45) NOT NULL,
  `DataAbertura` VARCHAR(45) NOT NULL,
  `DataFecho` VARCHAR(45) NOT NULL,
  `ValorGanhoPerda` VARCHAR(45) NOT NULL,
  `PerGanhoPerda` VARCHAR(45) NOT NULL,
  `Username` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`History`),
  INDEX `fk_History_User_idx` (`Username` ASC),
  CONSTRAINT `fk_History_User`
    FOREIGN KEY (`Username`)
    REFERENCES `eotp`.`User` (`Username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eotp`.`Watchlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eotp`.`Watchlist` (
  `CodigoNASDAQ` VARCHAR(4) NOT NULL,
  `Username` VARCHAR(45) NOT NULL,
  INDEX `fk_Watchlist_User1_idx` (`Username` ASC),
  CONSTRAINT `fk_Watchlist_User1`
    FOREIGN KEY (`Username`)
    REFERENCES `eotp`.`User` (`Username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
