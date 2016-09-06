'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./src/server/auth.js');
const multer = require('multer');
const app = express();
const path = require('path');
const Question = require('./src/server/model/Question.js');
const QuestionService = require('./src/server/service/QuestionManagementService.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send("Something broke!");
});

app.use(express.static(__dirname + '/public'));

var router = express.Router();

router.get('/', function (req, res) {
  console.log('');
  res.sendFile(path.join(__dirname, 'index.html'));
});

router.get('/questions', function (req, res) {
  res.set('Access-Control-Allow-Origin', 'http://localhost:7070');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
  var questionId = req.params.questionId;
  var question = {};
  if(!!questionId) {
    question = {id: questionId};
  }
  var service = new QuestionService();
  service.findQuestion(question, function(data) {
    res.send(data);
  });
});

router.post('/add', function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST');
  res.set('Access-Control-Allow-Headers', 'Content-type,Accept,X-Custom-Header');
  console.log(req.body);
  var service = new QuestionService();
  service.add(req.body, function(data) {
    res.send(data);
  });

});

router.get('/googleLogin', function (req, res) {
  var url = auth.getGoogleLoginUrl();
  res.redirect(url);
});

router.get('/oauth2callback', function (req, res) {
  var code = req.query.code;
  auth.getAccessToken(code);
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.use('/api', router);

app.listen(8888);
console.log("Server has started.");
