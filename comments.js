// create web server
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// create a read stream from the file
const readStream = fs.createReadStream(path.join(__dirname, './comments.txt'), 'utf8');

// create a write stream to the file
const writeStream = fs.createWriteStream(path.join(__dirname, './comments.txt'), { flags: 'a' });

app.use(bodyParser.json());

// create a GET route
app.get('/', (req, res) => {
  readStream.pipe(res);
});

// create a POST route
app.post('/', (req, res) => {
  const { comment } = req.body;
  writeStream.write(`${comment}\n`);
  res.send('Comment added');
});

// start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});