const psql = require('../models/postgresDB');

module.exports = {
  getQuestions: async (req, res) => {
    try {
      const data = await psql.getQuestions(req.query.product_id);
      res.send(data);
    } catch (err) {
      console.error(err);
    }
  },
  addQuestion: () => {},
  putHelpful: () => {},
  putReport: () => {}
}