DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id integer primary key,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL
);
