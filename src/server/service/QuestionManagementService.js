/**
 * Created by smallpigex on 2016/7/23.
 */
const Question = require('../model/Question.js');

var QuestionManagementService = function() {

  this.add = function(data, callback) {
     var result = {
       message: 'success'
     };

     if(validation(data)) {
       var aQuestion = new Question(data);
       aQuestion.save(function(err) {
         if(err) {
           processError(err, callback);
         }
       });
     } else {
       callback(result);
     }
  };

  this.findQuestion = function (data, callback) {
    Question.find(data, (err, questions) => {
      if(err) {
        processError(err, callback);
      }
      if (questions) {
        callback(JSON.stringify(questions));
      }
    });
  };
  
  var validation = function (data) {
    for(var prop in data) {
      if(data.hasOwnProperty(prop)) {
        if(!data[prop]) {
          console.log(data[prop]);
          return false;
        }
      }
    }
    return true;
  };

  var processError = function (err, callback) {
    var result = {
      message: 'Something was error.'
    };
    console.error(err);
    callback(result);
  }

};

module.exports = QuestionManagementService;