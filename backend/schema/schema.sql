CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION uuidv7()
RETURNS uuid
LANGUAGE plpgsql
AS $$
DECLARE
  unix_time_ms bytea;
  uuid_bytes bytea;
BEGIN
  unix_time_ms := substring(
    int8send(CAST(FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) AS bigint))
    FROM 3 FOR 6
  );
  uuid_bytes := unix_time_ms || gen_random_bytes(10);
  uuid_bytes := set_byte(uuid_bytes, 6, (get_byte(uuid_bytes, 6) & 15) | 112);
  uuid_bytes := set_byte(uuid_bytes, 8, (get_byte(uuid_bytes, 8) & 63) | 128);
  RETURN encode(uuid_bytes, 'hex')::uuid;
END;
$$;

CREATE TYPE user_role AS ENUM ('tenaga_kesehatan', 'kader', 'orang_tua', 'admin');
CREATE TYPE stunting_status AS ENUM ('severely_stunted', 'stunted', 'normal', 'tall');
CREATE TYPE question_type AS ENUM ('multiple_choice', 'true_false');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuidv7(),
    name VARCHAR(255) NOT NULL,
    nik VARCHAR(20) UNIQUE,
    phone_number VARCHAR(20),
    role user_role NOT NULL,
    reset_token VARCHAR(100),
    reset_token_expiry TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_logged_in TIMESTAMP,
    is_notification_enabled BOOLEAN DEFAULT TRUE
);

CREATE TABLE children (
    id UUID PRIMARY KEY DEFAULT uuidv7(),
    parent_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    nik VARCHAR(20),
    full_name VARCHAR(255) NOT NULL,
    gender VARCHAR(10),
    birth_date DATE NOT NULL,
    home_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE measurement (
    id UUID PRIMARY KEY DEFAULT uuidv7(),
    measurer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    measurer_role user_role NOT NULL,
    children_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    age NUMERIC(5, 2) NOT NULL,
    measured_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    weight NUMERIC(5, 2) NOT NULL,
    height NUMERIC(5, 2) NOT NULL,
    stunting_status stunting_status,
    z_score NUMERIC(4, 2),
    head_circumference NUMERIC(5, 2),
    upper_arm_circumference NUMERIC(5, 2)
);

CREATE TABLE quiz (
    id UUID PRIMARY KEY DEFAULT uuidv7(),
    creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuidv7(),
    quiz_id UUID NOT NULL REFERENCES quiz(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type question_type NOT NULL,
    options JSONB,
    correct_ans TEXT
);

CREATE TABLE quiz_submissions (
    id UUID PRIMARY KEY DEFAULT uuidv7(),
    kader_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quiz_id UUID NOT NULL REFERENCES quiz(id) ON DELETE CASCADE,
    score NUMERIC(5, 2),
    answers JSONB,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE education_material (
    id UUID PRIMARY KEY DEFAULT uuidv7(),
    creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    video_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuidv7(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);