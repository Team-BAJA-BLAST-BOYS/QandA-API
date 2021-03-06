-- CREATE DATABASE questionsandanswers;

\c questionsandanswers;

--Creates the questions table--
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  body TEXT NOT NULL,
  date_written BIGINT,
  asker_name TEXT NOT NULL,
  asker_email TEXT,
  reported INT DEFAULT 0,
  helpful INT DEFAULT 0
);

\copy questions FROM '~/Desktop/work/sdc_files/questions.csv' DELIMITER ',' CSV HEADER;


--Creates the answers table--
CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INT NOT NULL,
  body TEXT NOT NULL,
  date_written BIGINT,
  answerer_name TEXT NOT NULL,
  answerer_email TEXT,
  reported INT DEFAULT 0,
  helpful INT DEFAULT 0,
  CONSTRAINT fk_answer_question_id2
    FOREIGN KEY(question_id)
      REFERENCES questions(id)
);

\copy answers FROM '~/Desktop/work/sdc_files/answers.csv' DELIMITER ',' CSV HEADER;

--Creates the photos table--
CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  answer_id INT NOT NULL,
  url TEXT
);

\copy photos FROM '~/Desktop/work/sdc_files/answers_photos.csv' DELIMITER ',' CSV HEADER;


--Create Index--
CREATE INDEX index_product_id ON questions(product_id);
CREATE INDEX fk_answer_question_id ON answers(question_id);
CREATE INDEX fk_photos_answer_id ON photos(answer_id);