CREATE DATABASE timebank;
USE timebank;

CREATE TABLE users
	(
id int NOT NULL AUTO_INCREMENT, 
username VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
github VARCHAR(255) NOT NULL,
discord VARCHAR(255) NOT NULL,
skype VARCHAR(255) NOT NULL,
credits VARCHAR(255) NOT NULL,
createdAt timesteamp default current_timestamp,
updatedAt timesteamp default current_timestamp,
PRIMARY KEY (id)
);

CREATE TABLE questions

(
id int NOT NULL AUTO_INCREMENT,
language VARCHAR(255) NOT NULL , 
topic VARCHAR (255) NOT NULL ,
createdAt VARCHAR(255) NOT NULL ,
updatedAt VARCHAR(255) NOT NULL ,
UserId FOREIGN KEY
);