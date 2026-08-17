-- Active: 1786424775375@@127.0.0.1@5432@centing_dev

CREATE TYPE roles AS ENUM ('tenaga_kesehatan', 'kader', 'orang_tua');

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuidv7(),
    name VARCHAR(256) NOT NULL,
    phone_number VARCHAR(256) UNIQUE NOT NULL,
    role roles NOT NULL DEFAULT 'kader',
    reset_token       TEXT,
    reset_token_expiry TIMESTAMPTZ,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);