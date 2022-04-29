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
  addQuestion: async (req, res) => {
    try {
      const data = await psql.addQuestion({
        body: req.body.body,
        name: req.body.name,
        email: req.body.email,
        product_id: req.body.product_id
      });
      res.send('inserted');
    } catch (err) {
      console.error(err);
    }
  },
  putHelpful: async(req, res) => {
    try {
      await psql.putHelpful(req.params.question_id);
      res.send('updated as helpful!');
    } catch(err) {
      console.error(err);
    }

  },
  putReport: () => {}
}