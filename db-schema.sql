CREATE SCHEMA IF NOT EXISTS `tin-s16475`;

CREATE TABLE IF NOT EXISTS `tin-s16475`.`Employee`
    ( `empNo` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `firstName` VARCHAR(50) NOT NULL ,
      `lastName` VARCHAR(50) NOT NULL ,
      `email` VARCHAR(50) NOT NULL ,
      `pass` VARCHAR(100) NOT NULL ,
      PRIMARY KEY (`empNo`) ,
      UNIQUE INDEX `empNo_UNIQUE` (`empNo` ASC)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-s16475`.`Policy`
    ( `policyNo` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `startDate` DATETIME NOT NULL ,
      `endDate` DATETIME NOT NULL ,
      `sumInsured` DECIMAL(10,2) UNSIGNED NOT NULL ,
      `insurerId` INT UNSIGNED NOT NULL ,
      PRIMARY KEY (`policyNo`) ,
      UNIQUE INDEX `policyNo_UNIQUE` (`policyNo` ASC)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-s16475`.`Claim`
    ( `claimNo` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `date` DATETIME NOT NULL ,
      `value` DECIMAL(10,2) UNSIGNED NOT NULL ,
      `cause` VARCHAR(50) NOT NULL ,
      `policy` INT UNSIGNED NOT NULL , 
      PRIMARY KEY (`claimNo`) ,
      UNIQUE INDEX `claimNo_UNIQUE` (`claimNo` ASC) ,
      CONSTRAINT `policy_fk` FOREIGN KEY (`policy`) REFERENCES `tin-s16475`.`Policy` (`policyNo`)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-s16475`.`Claim_Employee`
    ( `claim_employeeNo` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `workStartDate` DATETIME NOT NULL ,
      `workEndDate` DATETIME ,
      `claimNo` INT UNSIGNED NOT NULL ,
      `empNo` INT UNSIGNED NOT NULL ,
      PRIMARY KEY (`claim_employeeNo`) ,
      CONSTRAINT `claim_fk` FOREIGN KEY (`claimNo`) REFERENCES `tin-s16475`.`Claim` (`claimNo`) ,
      CONSTRAINT `emp_fk` FOREIGN KEY (`empNo`) REFERENCES `tin-s16475`.`Employee` (`empNo`)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

INSERT IGNORE INTO `tin-s16475`.`Employee` (`empNo`, `firstName`, `lastName`, `email`, `pass`) VALUES
  (1, 'Jan', 'Kowalski', 'jan.kowalski@axe.com', '$2a$08$pMagzL5e9dAH3dXGUPGdhuqFiKrW1w92CdjxWccBDUeyjF5Blzey6') ,     --test1
  (2, 'Stefan', 'Boczek', 'stefan.boczek@axe.com', '$2a$08$FrHgKwoLXOFhgCk4d581T.XH8bg.sezjSt0FP4RRvbqOYANiaSeWG') ,   --pass1
  (3, 'Marian', 'Nowak', 'marian.nowak@axe.com', '$2a$08$FrHgKwoLXOFhgCk4d581T.MKb0pUIR2KIhyNIYCmPx4fMM7VBhcnW')       --secret
;

INSERT IGNORE INTO `tin-s16475`.`Policy` (`policyNo`, `startDate`, `endDate`, `sumInsured`, `insurerId`) VALUES
  (1, '2019-01-01', '2020-12-31', 500000, 1) ,
  (2, '2020-01-01', '2021-12-31', 25000, 2) 
;

INSERT IGNORE INTO `tin-s16475`.`Claim` (`claimNo`, `date`, `value`, `cause`, `policy`) VALUES
  (1, '2020-01-05', 3000, 'pozar', 1) ,
  (2, '2020-02-07', 31000, 'kradziez', 1) ,
  (3, '2020-03-12', 4000, 'pozar', 1) ,
  (4, '2020-06-05', 37300, 'zalanie', 2) ,
  (5, '2020-07-22', 2100, 'huragan', 2) 
;

INSERT IGNORE INTO `tin-s16475`.`Claim_Employee` (`claim_employeeNo`, `workStartDate`, `workEndDate`, `claimNo`, `empNo`) VALUES
  (1, '2020-01-06', '2020-06-01', 1 , 1) ,
  (2, '2020-06-02', '2020-12-12', 1 , 2) ,
  (3, '2020-02-07', '2020-02-20', 2 , 1) ,
  (4, '2020-03-13', '2020-06-01', 3 , 2) ,
  (5, '2020-06-06', '2020-12-12', 4 , 3) ,
  (6, '2020-07-23', '2020-12-12', 5 , 3)
;




