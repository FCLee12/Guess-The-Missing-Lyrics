
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email_address" VARCHAR (250) NOT NULL,
    "game_id" INT
);

CREATE TABLE "gameSongs" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR (250) UNIQUE NOT NULL,
    "artist" VARCHAR (250) NOT NULL,
    "edited_lyrics" VARCHAR (1000) NOT NULL,
    "answer_lyrics" VARCHAR (1000) NOT NULL,
    "status" BOOLEAN DEFAULT FALSE,
    "user_id" INT REFERENCES "user",
    "score" INT
);