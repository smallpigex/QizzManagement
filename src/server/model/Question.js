/**
 * Created by smallpigex on 2016/7/23.
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect( 'mongodb://localhost/question' );

const QuestionSchema = mongoose.Schema ({
  question: String,
  answer: String,
  correctOption: String,
  badOption1: String,
  badOption2: String,
  badOption3: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;


