CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY, title VARCHAR(255) NOT NULL, author VARCHAR(255) NOT NULL, authorUrl VARCHAR (255), category VARCHAR(20), publishedOn DATETIME, body TEXT NOT NULL);