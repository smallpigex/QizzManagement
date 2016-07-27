/**
 * Created by smallpigex on 2016/7/23.
 */
const Question = require('../model/Question.js');

var QuestionManagementService = function() {

  this.add = function(data, callback) {
     var result = {
       message: 'Question update failure.'
     };
     if(validation(data)) {
       var aQuestion = new Question(data);
       aQuestion.save(function(err) {
         if(err) {
           console.log(err);
           callback(result);
         }
         result.message = 'Question successfully updated!';
         return callback(result);
       });
     } else {
       callback(result);
     }
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

};

module.exports = QuestionManagementService;