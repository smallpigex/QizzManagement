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
  console.log(path.join(__dirname, 'index.html'));
  res.sendFile(path.join(__dirname, 'index.html'));
});

router.get('/questions', function (req, res) {
  console.log(Question.find({}, (err, questions) => {
      if (questions) {
        console.log(questions);
        res.send(JSON.stringify(questions));
      }
    }));
});

router.post('/add', function (req, res) {
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
