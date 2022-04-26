const { Pool } = require('pg');

const credentials = {
  user: 'postgres',
  host: 'localhost',
  database: 'questionsandanswers',
  password: 'uroot',
  port: 5432
}

const pool = new Pool(credentials);

pool.connect();

module.exports = {
  getQuestions: async (product_id) => {
    console.log('product_id: ', product_id);
    const { rows } = await pool.query(`
      SELECT
        id AS question_id,
        body AS question_body,
        date_written AS question_date,
        asker_name,
        asker_email,
        reported,
        helpful AS question_helpfulness
      FROM questions
      WHERE product_id=$1
      ORDER BY id`, [product_id]);
      console.log('getQuestions query level 1: ', product_id)
      for (let question of rows) {
        question.answers = {};
        const { rows: answerRows } = await pool.query(`
          SELECT
            id,
            body,
            date_written AS date,
            helpful AS helpfulness,
            answerer_name
          FROM answers
          WHERE question_id=$1
          ORDER BY id`, [question.question_id]);
          console.log('getQuestions query level 2: ', product_id)
          for (let answer of answerRows) {
            question.answers[answer.id] = answer;
            const { rows: photoRows } = await pool.query(`
              SELECT
                id,
                url
              FROM photos
              WHERE answer_id=$1
              ORDER BY id
            `, [answer.id]);
            console.log('getQuestions query level 3: ', product_id)
            answer.photos = photoRows;
          }
      }
      return {
        product_id,
        results: rows
      }
  },
  addQuestion: (product_id, data) => {
    console.log('product_id: ', product_id);
  },
  getAnswers: async(question_id, page, counter) => {
    console.log('question_id: ', question_id);
    console.log('page: ', page);
    console.log('counter: ', counter);
    const { rows } = await pool.query(`
      SELECT
        id AS answer_id,
        body AS answer_body,
        date_written AS date,
        helpful AS helpfulness,
        answerer_name
      FROM answers
      WHERE question_id=$1
      ORDER BY id`, [question_id]);
    console.log('rows: ', rows);
    return {
      question_id,
      page,
      count: counter,
      results: rows
    }
  },
  addAnswer: () => {}
}