DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id integer primary key,
    username varchar(255) NOT NULL,
    user_type varchar(50) NOT NULL DEFAULT 'non-admin' CHECK(user_type IN ('non-admin', 'admin')),
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL
);