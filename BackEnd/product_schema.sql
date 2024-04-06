DROP TABLE IF EXISTS products;

CREATE TABLE products (
    product_id INTEGER PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_type VARCHAR(255) NOT NULL,
    product_location VARCHAR(255) NOT NULL,
    product_details VARCHAR(255) NOT NULL DEFAULT '',
    total_product_count INTEGER NOT NULL DEFAULT 0 CHECK (total_product_count >= 0),
    -- Ensure total count is non-negative
    product_status VARCHAR(255) NOT NULL DEFAULT 'available' CHECK (
        product_status IN ('available', 'sold', 'on-hold')
    ),
    -- Allow only specific values
    product_sale_count INTEGER NOT NULL DEFAULT 0 CHECK (product_sale_count >= 0),
    -- Ensure sale count is non-negative
    product_on_hold_count INTEGER NOT NULL DEFAULT 0 CHECK (product_on_hold_count >= 0) -- Ensure on hold count is non-negative
);