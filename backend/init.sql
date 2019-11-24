DROP TABLE users;
CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    "firstName" character varying(1000),
    "lastName" character varying(1000),
    email character varying(1000),
    password character varying(1000),
    gender character varying(1000),
    "jobRole" character varying(1000),
    department character varying(1000),
    address character varying(1000),
    "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp
);

DROP TABLE articles;
CREATE TABLE articles
(
    id SERIAL PRIMARY KEY,
    title character varying(1000),
    article character varying(1000),
    "userId" integer,
    "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp
);

DROP TABLE article_comments;
CREATE TABLE article_comments
(
    id integer NOT NULL,
    comment character varying(1000)  NOT NULL,
    "articleId" integer NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp,
    CONSTRAINT article_comments_pkey PRIMARY KEY (id)
);