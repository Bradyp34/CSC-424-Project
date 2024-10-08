DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id integer primary key,
    username varchar(255) NOT NULL UNIQUE,
    user_type varchar(50) NOT NULL DEFAULT 'non-admin' CHECK(user_type IN ('non-admin', 'admin')), --Changed to 'non-admin'
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL
);