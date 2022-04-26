const Routers = require('express').Router();
const questions = require('./controllers/questions.js');
const answers = require('./controllers/answers.js')

// Questions
Routers.get('/questions', questions.getQuestions);
Routers.post('/questions', questions.addQuestion);
Routers.put('/questions/:question_id/helpful', questions.putHelpful);
Routers.put('/questions/:question_id/report', questions.putReport);

// Answers
Routers.get('/questions/:question_id/answers', answers.getAnswers);
Routers.post('/questions/:question_id/answers', answers.addAnswer);
Routers.put('/answers/:answer_id/helpful', answers.putHelpful);
Routers.put('/answers/:answer_id/report', answers.putReport);

module.exports = Routers;