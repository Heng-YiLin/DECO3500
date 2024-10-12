-- Create the 'users' table
CREATE TABLE deco_users (
    id SERIAL PRIMARY KEY,  -- Automatically increments user IDs
    name VARCHAR(255) NOT NULL UNIQUE,  -- Unique constraint for username
    password VARCHAR(255) NOT NULL,  -- Password is mandatory
    background VARCHAR(255),
    languages VARCHAR(255),
    interests VARCHAR(255),
    location VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE;
);

-- Create the 'events' table
CREATE TABLE events (
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
CREATE TABLE event_categories (
    id SERIAL PRIMARY KEY,  -- Auto increments category IDs
    event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,  -- References the events table, cascades on delete
    category_name VARCHAR(255) NOT NULL UNIQUE  -- Ensure unique category names
);

-- Create the 'events_attending' table
CREATE TABLE events_attending (
    id SERIAL PRIMARY KEY,  -- Auto increments IDs for records
    user_id INTEGER NOT NULL REFERENCES deco_users(id) ON DELETE CASCADE,  -- References the users table, cascades on delete
    event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE  -- References the events table, cascades on delete
);

-- Create the 'forum_posts' table
CREATE TABLE forum_posts (
    id SERIAL PRIMARY KEY,  -- Auto increments post IDs
    headline VARCHAR(255) NOT NULL,  -- Headline is mandatory
    description TEXT NOT NULL,  -- Description is mandatory
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Automatically records the timestamp
    user_id INTEGER REFERENCES deco_users(id) ON DELETE CASCADE  -- References the user who created the post
);

-- Create the 'forum_post_categories' table
CREATE TABLE forum_post_categories (
    id SERIAL PRIMARY KEY,  -- Auto increments post category IDs
    post_id INTEGER NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,  -- Foreign key for post, cascades on delete
    category_name VARCHAR(255) NOT NULL  -- Category for the post
);

CREATE TABLE forum_comments (
    id SERIAL PRIMARY KEY,  -- Unique comment ID
    post_id INTEGER NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,  -- References the forum post
    user_id INTEGER NOT NULL REFERENCES deco_users(id) ON DELETE CASCADE,  -- References the user who made the comment
    comment_text TEXT NOT NULL  -- The content of the comment
);

-- Grant permissions to a student
GRANT USAGE ON SCHEMA api TO student;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA api TO student;

-- Automatically give permissions on new tables that are created in the future
ALTER DEFAULT PRIVILEGES IN SCHEMA api GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO student;


-- DUMMY DATA
INSERT INTO deco_users (name, email, password, background, languages, interests, location) VALUES
('Sarah Connor', 'sarah.connor@example.com', 'password123', 'Teacher', 'English, Spanish', 'Gardening, Cooking', 'New York'),
('John Doe', 'john.doe@example.com', 'password456', 'Engineer', 'English', 'Cycling, Reading', 'Los Angeles'),
('Jane Smith', 'jane.smith@example.com', 'password789', 'Stay-at-home parent', 'English, French', 'Photography, Painting', 'Chicago'),
('Emily Johnson', 'emily.johnson@example.com', 'password321', 'Doctor', 'English, German', 'Running, Volunteering', 'San Francisco');

INSERT INTO events (name, location, start_date, start_time, end_date, end_time, description, agenda, category_id, accessibility_group_id) VALUES
('Parent-Teacher Meeting', 'School Hall', '2024-11-01', '18:00', '2024-11-01', '20:00', 'Discussing student progress', 'Welcome speech, one-on-one meetings with teachers, Q&A session', NULL, NULL),
('School Picnic', 'Central Park', '2024-11-15', '10:00', '2024-11-15', '14:00', 'Annual school picnic for parents and children', 'Gathering at park, games, lunch', NULL, NULL),
('Fundraiser Event', 'Gymnasium', '2024-12-05', '09:00', '2024-12-05', '13:00', 'Raising funds for new school library', 'Introduction by principal, auction, bake sale', NULL, NULL),
('Language Workshop', 'Room 101', '2024-12-10', '14:00', '2024-12-10', '16:00', 'Language learning techniques for bilingual parents', 'Interactive workshop with language experts, Q&A', NULL, NULL);

INSERT INTO event_categories (event_id, category_name) VALUES
(1, 'Meeting'),
(2, 'Social Event'),
(3, 'Fundraiser'),
(4, 'Workshop');

INSERT INTO events_attending (user_id, event_id) VALUES
(1, 1),  -- Sarah attending Parent-Teacher Meeting
(2, 2),  -- John attending School Picnic
(3, 3),  -- Jane attending Fundraiser Event
(4, 4),  -- Emily attending Language Workshop
(1, 2),  -- Sarah attending School Picnic
(2, 3);  -- John attending Fundraiser Event

INSERT INTO forum_posts (headline, description, created_at, user_id) VALUES
('How to Help Children with Homework?', 'Looking for tips on how to support my child with math homework.', CURRENT_TIMESTAMP, 1),
('Community Language Classes?', 'Does anyone know if the school offers language classes for parents?', CURRENT_TIMESTAMP, 2),
('Fundraiser Ideas Needed', 'We are planning a school fundraiser, any ideas are welcome!', CURRENT_TIMESTAMP, 3),
('Parenting Workshops?', 'Has anyone attended the school parenting workshops? Are they helpful?', CURRENT_TIMESTAMP, 4);

INSERT INTO forum_post_categories (post_id, category_name) VALUES
(1, 'Education'),
(2, 'School Programs'),
(3, 'Fundraising'),
(4, 'Workshops');

INSERT INTO forum_comments (post_id, user_id, comment_text) VALUES
(1, 2, 'I recommend using online math games. They help make learning fun for kids.'),
(1, 3, 'You can try breaking the homework into smaller tasks to make it less overwhelming.'),
(2, 1, 'Yes! The school offers Spanish and Mandarin classes for parents.'),
(3, 4, 'How about a bake sale or silent auction? We did that last year, and it was a success!'),
(4, 2, 'Yes, I attended a few sessions, and they were very informative.');
