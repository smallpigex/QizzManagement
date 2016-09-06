/**
 * Created by smallpigex on 2016/7/17.
 */

var readline = require('readline');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var plus = google.plus('v1');
var CLIENT_ID = '',
  CLIENT_SECRET = '',
  REDIRECT_URL = 'http://localhost:8888/api/oauth2callback',
  SCOPE = ['https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/plus.me',
  ];
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var auth = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
var url = auth.generateAuthUrl({scope: SCOPE});

module.exports = {
  getGoogleLoginUrl: function () {
    return url;
  },
  getAccessToken: function (code) {
    auth.getToken(code, function (err, tokens) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      auth.setCredentials(tokens);
      console.log(tokens);
      plus.people.get({userId: 'me', auth: auth}, function (err, user) {
        console.log('Result: ' + (err ? err.message : user.displayName));
      });
    });
  }
};
