/**
 * Created by smallpigex on 2016/7/23.
 */

const Question = require('../model/Question.js');

module.exports = class QuestionManagementService {
  constructor() {
    this.resultSet = {
      result: false,
      message: 'success'
    };
  }

  add(data, callback) {
    if (!data._id) {
      delete data._id;
    }

    if (this.validation(data)) {
      const aQuestion = new Question(data);
      const that = this;
      aQuestion.save(function storeData(err) {
        if (err) {
          this.processError(err, callback);
        }
        that.resultSet.result = true;
        that.resultSet.message = 'The question was added.';
        that.findLatestQuestion(that.resultSet, callback);
      });
    }
  }

  findQuestion(data, callback) {
    Question.find(data, (err, questions) => {
      if (err) {
        this.processError(err, callback);
      }
      if (questions) {
        callback(JSON.stringify(questions));
      }
    });
  }

  findLatestQuestion(resultSet, callback) {
    const that = this;
    Question.findOne({}).sort({ 'createdAt': -1 }).exec((err, lastedQuestion) => {
      that.resultSet.question = lastedQuestion;
      callback(resultSet);
    });
  }

  delete(data, callback) {
    const that = this;
    Question.remove({_id: data._id}, function(err) {
      if(err) {
        that.processError(err, callback);
      }
      that.resultSet.result = true;
      that.resultSet.message = 'The question was deleted.';
      callback(that.resultSet);
    });
  }

  validation (data) {
    for (var prop in data) {
      if(data.hasOwnProperty(prop)) {
        if(!data[prop]) {
          return false;
        }
      }
    }
    return true;
  }

  processError(err, callback) {
    var resultSet = {
      message: 'Something was error.'
    };
    callback(resultSet);
  }
}
