'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./src/server/auth.js');
const app = express();
const path = require('path');
const QuestionService = require('./src/server/service/QuestionManagementService.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));

app.use(function (err, req, res, next) {
  res.status(500).send("Something broke!");
});

app.use(express.static(__dirname + '/public'));

var router = express.Router();

function sendToClinet(data) {
  this.send(data);
}

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

router.get('/questions', function (req, res) {
  const questionId = req.params.questionId;
  let question = {};
  const isOk = !!questionId;
  if (isOk) {
    question = { id: questionId };
  }
  const service = new QuestionService();
  service.findQuestion(question, sendToClinet.bind(res));
});

router.post('/add', function (req, res) {
  const service = new QuestionService();
  service.add(req.body, sendToClinet.bind(res));
});

router.delete('/delete', function(req, res) {
  const service = new QuestionService();
  service.delete(req.body, sendToClinet.bind(res));
})



router.get('/googleLogin', function (req, res) {
  const url = auth.getGoogleLoginUrl();
  res.redirect(url);
});

router.get('/oauth2callback', function (req, res) {
  var code = req.query.code;
  auth.getAccessToken(code);
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/api', router);

app.listen(process.env.PORT || 8888);
console.log("Server has started.");
