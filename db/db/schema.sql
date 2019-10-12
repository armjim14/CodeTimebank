CREATE DATABASE timebank;
USE timebank;

/*
CREATE TABLE Login (
  ID int(11) NOT NULL,
  Email varchar(45) NOT NULL,
  Password varchar(45) NOT NULL
);
*/

CREATE TABLE Users (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  github varchar(255) NOT NULL,
  discord varchar(255) NOT NULL,
  skype varchar(255) NOT NULL,
  hirable varchar(255) NOT NULL,
  securityQuestion varchar(255) NOT NULL,
  securityAnswer varchar(255) NOT NULL,
  isAdmin tinyint(1) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY username (username)
);

CREATE TABLE questions(
  id INT NOT NULL AUTO_INCREMENT,
  theQuestion VARCHAR (250) NOT NULL,
  questions BOOLEAN DEFAULT false,
	PRIMARY KEY(id)
  KEY UserId (UserId)
);

CREATE TABLE times (
  id int(11) NOT NULL AUTO_INCREMENT,
  Time int(11) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  UserId int(11) NOT NULL,
  questionId int(11) NOT NULL,
  PRIMARY KEY (id),
  KEY UserId (UserId),
  KEY questionId (questionId),
  CONSTRAINT times_ibfk_1 FOREIGN KEY (UserId) REFERENCES register (id) ON UPDATE CASCADE,
  CONSTRAINT times_ib
);

CREATE TABLE followers (
  /*id int(11) NOT NULL AUTO_INCREMENT,*/
  followerId int(11) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  UserId int(11) NOT NULL,
  PRIMARY KEY (id),
  KEY UserId (UserId),
  CONSTRAINT followers_ibfk_1 FOREIGN KEY (UserId) REFERENCES register (id) ON UPDATE CASCADE
);