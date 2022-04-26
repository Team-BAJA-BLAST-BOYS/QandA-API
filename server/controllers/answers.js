const psql = require('../models/postgresDB');

module.exports = {
  getAnswers: async(req, res) => {
    try {
      const data = await psql.getAnswers(req.params.question_id, req.query.page, req.query.count);
      res.send(data);
    } catch (err) {
      console.error(err);
    }
  },
  addAnswer: () => {},
  putHelpful: () => {},
  putReport: () => {}
};