CREATE TABLE users
	(
username VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
github VARCHAR(255) NOT NULL,
discord VARCHAR(255) NOT NULL,
skype VARCHAR(255) NOT NULL,
credits VARCHAR(255) NOT NULL,
createdAt timestamp default current_timestamp,
updatedAt timestamp default current_timestamp,
PRIMARY KEY (id)
);
     
CREATE TABLE questions
(
id int NOT NULL ,
language VARCHAR(255) NOT NULL ,
topic VARCHAR (255) NOT NULL ,
question TEXT(500) NOT NULL,
repo VARCHAR (255) NOT NULL ,
solved VARCHAR (255) NOT NULL ,
createdAt timestamp default current_timestamp,
updatedAt timestamp default current_timestamp,
FOREIGN KEY
);


CREATE TABLE times
 (
  id int(11) NOT NULL AUTO_INCREMENT,
  Time int(11) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  UserId int(11) NOT NULL,
  questionId int(11) NOT NULL,
  PRIMARY KEY (id),
  KEY UserId (UserId),
  KEY questionId (questionId),
  CONSTRAINT times_ibfk_1 FOREIGN KEY (UserId) REFERENCES users (id) ON UPDATE CASCADE,
  CONSTRAINT times_ibfk_2 FOREIGN KEY (questionId) REFERENCES questions (id) ON UPDATE CASCADE
);

