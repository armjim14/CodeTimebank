CREATE DATABASE timebank;
USE timebank;

CREATE TABLE questions (
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

CREATE TABLE Users (
  id int(11) NOT NULL AUTO_INCREMENT,
  question text NOT NULL,
  language varchar(255) NOT NULL,
  topic varchar(255) NOT NULL,
  repo varchar(255) DEFAULT NULL,
  solved tinyint(1) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  UserId int(11) NOT NULL,
  PRIMARY KEY (id),
  KEY UserId (UserId),
  CONSTRAINT questions_ibfk_1 FOREIGN KEY (UserId) REFERENCES register (id) ON UPDATE CASCADE
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
  id int(11) NOT NULL AUTO_INCREMENT,
  followerId int(11) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  UserId int(11) NOT NULL,
  PRIMARY KEY (id),
  KEY UserId (UserId),
  CONSTRAINT followers_ibfk_1 FOREIGN KEY (UserId) REFERENCES register (id) ON UPDATE CASCADE
);