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
  originalGetQuestions: async (product_id) => {
    // console.log('product_id: ', product_id);
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
      // console.log('getQuestions query level 1: ', product_id)
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
          // console.log('getQuestions query level 2: ', product_id)
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
            // console.log('getQuestions query level 3: ', product_id)
            answer.photos = photoRows;
          }
      }
      return {
        product_id,
        results: rows
      }
  },
  getQuestions: async (product_id) => {
    const { rows } = await pool.query(`
      SELECT
        q.id AS question_id,
        q.body AS question_body,
        q.date_written AS question_date,
        asker_name,
        asker_email,
        q.reported,
        q.helpful AS question_helpfulness,
        a.id,
        a.body,
        a.date_written AS date,
        a.helpful AS helpfulness,
        answerer_name,
        p.id,
        p.url
      FROM questions q
      LEFT JOIN
        answers a
        ON q.id = a.question_id
      LEFT JOIN
        photos p
        ON a.id = p.answer_id
      WHERE product_id=$1
      ORDER BY q.id`, [product_id]);
      return {
        product_id,
        results: rows
      }
  },
  addQuestion: async(data) => {
    // console.log('data: ', data);
    const insertQuestion = `
      INSERT INTO
        questions (product_id, body, asker_name, asker_email, date_written)
      VALUES (${data.product_id}, '${data.body}', '${data.name}', '${data.email}', ${Date.now()})
      RETURNING id
      `;
    console.log('insertQuestion: ', insertQuestion);
    await pool.query(insertQuestion);
  },
  putHelpful: async(question_id) => {
    const update = "UPDATE questions SET helpful=helpful+1 WHERE id=" + question_id;
    await pool.query(update);
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