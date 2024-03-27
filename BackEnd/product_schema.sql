DROP TABLE IF EXISTS products;

CREATE TABLE products (
    product_id integer PRIMARY KEY,
    product_name varchar(50) NOT NULL,
    product_price float NOT NULL,
    product_location varchar(50) NOT NULL, -- Corrected column name and added NOT NULL
    product_count integer NOT NULL,
    product_status varchar(20) DEFAULT 'available' NOT NULL --Default is 'available' can change it to 'sold' and 'on-hold'
);
