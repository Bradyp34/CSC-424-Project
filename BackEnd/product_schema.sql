DROP TABLE IF EXISTS products;

CREATE TABLE products (
    product_id integer PRIMARY KEY,
    product_name varchar(50) NOT NULL,
    product_type varchar(20) NOT NULL,
    product_location varchar(50) NOT NULL, -- Corrected column name and added NOT NULL
    total_product_count integer NOT NULL,
    product_status varchar(20) DEFAULT 'available' NOT NULL --Default is 'available' can change it to 'sold' and 'on-hold'
    product_sale_count integer NOT NULL,
    product_on_hold_count integer NOT NULL --come up with a better name someone
);
