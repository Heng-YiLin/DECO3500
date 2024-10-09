-- Create the schema named 'deco'
CREATE SCHEMA deco;

-- Switch to using the 'deco' schema
SET search_path TO deco;

-- Create the 'users' table
CREATE TABLE deco.users (
    id SERIAL PRIMARY KEY,  -- Automatically increments user IDs
    username VARCHAR(255) NOT NULL UNIQUE,  -- Unique constraint for username
    password VARCHAR(255) NOT NULL,  -- Password is mandatory
    background VARCHAR(255),
    languages VARCHAR(255),
    interests VARCHAR(255),
    location VARCHAR(255)
);

-- Create the 'events' table
CREATE TABLE deco.events (
    id SERIAL PRIMARY KEY,  -- Automatically increments event IDs
    name VARCHAR(255) NOT NULL,  -- Event name is mandatory
    location VARCHAR(255),
    start_date DATE NOT NULL,  -- Start date is mandatory
    start_time TIME NOT NULL,  -- Start time is mandatory
    end_date DATE,
    end_time TIME,
    description VARCHAR(255),
    agenda TEXT,  -- Longer event agenda if needed
    category_id INTEGER,  -- References event categories, set to NULL on delete
    accessibility_group_id INTEGER  -- Can reference a future table for accessibility groups
);

-- Create the 'event_categories' table
CREATE TABLE deco.event_categories (
    id SERIAL PRIMARY KEY,  -- Auto increments category IDs
    event_id INTEGER NOT NULL REFERENCES deco.events(id) ON DELETE CASCADE,  -- References the events table, cascades on delete
    category_name VARCHAR(255) NOT NULL UNIQUE  -- Ensure unique category names
);

-- Create the 'events_attending' table
CREATE TABLE deco.events_attending (
    id SERIAL PRIMARY KEY,  -- Auto increments IDs for records
    user_id INTEGER NOT NULL REFERENCES deco.users(id) ON DELETE CASCADE,  -- References the users table, cascades on delete
    event_id INTEGER NOT NULL REFERENCES deco.events(id) ON DELETE CASCADE  -- References the events table, cascades on delete
);

-- Create the 'forum_posts' table
CREATE TABLE deco.forum_posts (
    id SERIAL PRIMARY KEY,  -- Auto increments post IDs
    headline VARCHAR(255) NOT NULL,  -- Headline is mandatory
    description TEXT NOT NULL,  -- Description is mandatory
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Automatically records the timestamp
    user_id INTEGER REFERENCES deco.users(id) ON DELETE CASCADE  -- References the user who created the post
);

-- Create the 'forum_post_categories' table
CREATE TABLE deco.forum_post_categories (
    id SERIAL PRIMARY KEY,  -- Auto increments post category IDs
    post_id INTEGER NOT NULL REFERENCES deco.forum_posts(id) ON DELETE CASCADE,  -- Foreign key for post, cascades on delete
    category_name VARCHAR(255) NOT NULL  -- Category for the post
);


create role authenticator noinherit login password 'password';
create role student nologin;
grant student to authenticator;

-- Grant permissions to a student
GRANT USAGE ON SCHEMA deco TO student;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA deco TO student;

-- Automatically give permissions on new tables that are created in the future
ALTER DEFAULT PRIVILEGES IN SCHEMA deco GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO student;