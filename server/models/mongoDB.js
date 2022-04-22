const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  body: String,
  date_written: Number,
  asker_name: String,
  asker_email: String,
  reported: Number,
  helpful: Number
});

const answersSchema = new mongoose.Schema({
  id: Number,
  question_id: Number,
  body: String,
  date_written: Number,
  answerer_name: String,
  answerer_email: String,
  reported: Number,
  helpful: Number
});

const answers_photosSchema = new mongoose.Schema({
  id: Number,
  answer_id: Number,
  url: String
});

const Questions = mongoose.model('Questions', questionsSchema);
const Answers = mongoose.model('Answers', answersSchema);
const AnswersPhotos = mongoose.model('AnswersPhotos', answers_photosSchema);

module.exports = {
  Questions, Answers, AnswersPhotos
};