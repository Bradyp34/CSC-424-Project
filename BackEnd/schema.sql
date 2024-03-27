DROP TABLE IF EXISTS users;
CREATE TABLE users (
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL
);




