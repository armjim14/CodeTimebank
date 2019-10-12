USE timebank;
  
INSERT INTO username (email) VALUES ('username', false);
INSERT INTO password (email, password) VALUES ('name', false);
INSERT INTO Security Question ('Favorit Number', 'Favorite Letter');
INSERT INTO Looking for Employment (True, False);
INSERT INTO Github Username (email, password) VALUES ('username', false);
INSERT INTO Discord Username(email, password) VALUES ('username', false);
INSERT INTO Skype Username (email, password) VALUES ('username', false);
INSERT INTO createdAt datetime NOT NULL;
INSERT INTO updatedAt datetime NOT NULL;

INSERT INTO questions (questions, theQuestion) VALUES ('question','Please enter a question');
INSERT INTO questions (questions, theQuestion) VALUES ('language', 'Please provide a language');
INSERT INTO questions (questions, theQuestion) VALUES ('comfort', 'Please provide your comfort level');

INSERT INTO createdAt (datetime);
INSERT INTO updatedAt (datetime);
INSERT INTO UserId (username);
INSERT INTO questionId (questions, thequestion);

INSERT INTO followerId (username);
INSERT INTO createdAt (datetime);
INSERT INTO updatedAt (datetime);
INSERT INTO UserId (username,user.id);
