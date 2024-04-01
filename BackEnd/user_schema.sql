DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id integer primary key,
    username varchar(255) NOT NULL UNIQUE,
    user_type varchar(50) NOT NULL DEFAULT 'regular' CHECK(user_type IN ('regular', 'admin')), --Changed to 'regular'
    email varchar(255) NOT NULL UNIQUE,
    user_password varchar(255) NOT NULL
);