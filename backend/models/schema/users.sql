-- schema definitions for the api database

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  name VARCHAR(255)
);

INSERT INTO users (email, password, name) VALUES ('yoda@lucas.com', 'force', 'Yoda');
INSERT INTO users (email, password, name) VALUES ('luke@lucas.com', 'father', 'Luke');
