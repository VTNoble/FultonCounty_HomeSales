-- Create table for dataframe to be loaded into
CREATE TABLE home_sales (
id SERIAL PRIMARY KEY,
address TEXT,
county TEXT,
state TEXT,
sale_date TEXT,
sale_year INT,
sale_month TEXT,
sale_price INT,
lat FLOAT(5),
long FLOAT(5),
block INT
);

