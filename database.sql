
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

-- MOCK DATA
INSERT INTO "gameSongs" ("title", "artist", "edited_lyrics", "answer_lyrics", "score")
VALUES (`Never Gonna Give You Up`,
        `Rick Astley`,
        `Oooh We're no strangers to love You know the rules and so do I A full 1 
        what I'm thinking of You wouldn't get this from any other guy I just 2 
        tell you how I'm feeling Gotta make you understand Never gonna 3 
        you up Never gonna let you 4 
        Never gonna run around and 5 
        you Never gonna make you 6 
        Never gonna say goodbye Never gonna tell a lie and 7 
        you We've known each other for so long Your heart's been aching, but You're too 8 
        to say it Inside, we both know what's been going on We know the game and we're gonna play it And if you ask me how I'm feeling Don't tell me you're too blind to see`,
        `Oooh We're no strangers to love You know the rules and so do I A full commitment's what I'm thinking of You wouldn't get this from any other guy I just wanna tell you how I'm feeling Gotta make you understand Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you We've known each other for so long Your heart's been aching, but You're too shy to say it Inside, we both know what's been going on We know the game and we're gonna play it And if you ask me how I'm feeling Don't tell me you're too blind to see`,
        8),
        (`Wait For You`,
        `Elliott Yamin`,
        `I never felt nothing in the 1 
        like this before (noo) Now I'm missing you and I'm wishing you would come back through my 2 
        (yeah) Oooooo Why did you have to go? (go) You could have let me know (know) So now I'm all 3 
        (ooo) Girl you could have stayed but you wouldn't give me a 4 (no) With you not around it's a little bit more than I can 4 
        (yeah) Oooooo And all my tears they (they) Keep running down my face (face) Why did you 5 
        away? So why does your pride make you run and hide? Are you that 6 
        of me? But I know it's a lie What you keep inside This is not how you want it to be So 7 
        I will wait for you 'Cause I don't know what else I can do Don't tell me I ran out of 8 
        If it takes the rest of my life Baby I will wait for you If you think I'm fine it just ain't true I really need you in my life No matter what I have to do I'll wait for you`,
        `I never felt nothing in the world like this before (noo) Now I'm missing you and I'm wishing you would come back through my door (yeah) Oooooo Why did you have to go? (go) You could have let me know (know) So now I'm all alone (ooo) Girl you could have stayed but you wouldn't give me a chance (no) With you not around it's a little bit more than I can stand (yeah) Oooooo And all my tears they (they) Keep running down my face (face) Why did you turn away? So why does your pride make you run and hide? Are you that afraid of me? But I know it's a lie What you keep inside This is not how you want it to be So baby I will wait for you 'Cause I don't know what else I can do Don't tell me I ran out of time If it takes the rest of my life Baby I will wait for you If you think I'm fine it just ain't true I really need you in my life No matter what I have to do I'll wait for you`,
        4)