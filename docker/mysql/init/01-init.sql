-- Initialize the database
CREATE DATABASE IF NOT EXISTS apollo_knex_demo;

USE apollo_knex_demo;

-- Create a user for the application
CREATE USER IF NOT EXISTS 'demo_user' @'%' IDENTIFIED BY 'demo_password';

GRANT ALL PRIVILEGES ON apollo_knex_demo.* TO 'demo_user' @'%';

FLUSH PRIVILEGES;

-- Set timezone
SET time_zone = '+00:00';