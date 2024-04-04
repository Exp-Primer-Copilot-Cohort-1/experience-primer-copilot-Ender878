// create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var comments = require('./comments.json');

// specify the folder to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// specify the template engine
app.set('view engine', 'ejs');

// specify the folder where the templates are
app.set('views', path.join(__dirname, 'views'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// get all comments
app.get('/comments', function (req, res) {
  res.render('comments', { comments: comments });
});

// add a new comment
app.post('/comments', function (req, res) {
  var comment = req.body;
  comments.push(comment);
  fs.writeFile('comments.json', JSON.stringify(comments), function (err) {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    res.redirect('/comments');
  });
});

// start the server
app.listen(3000, function () {
  console.log('Server is listening on port 3000');
});