CREATE TABLE users
	(
id int NOT NULL AUTO_INCREMENT, 
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
UserId FOREIGN KEY
);
