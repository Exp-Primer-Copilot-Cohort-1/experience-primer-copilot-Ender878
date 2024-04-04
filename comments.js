// create web server

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Server Error');
            return;
        }
        res.send(data);
    });
});

app.post('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Server Error');
            return;
        }
        const comments = JSON.parse(data);
        const newComment = {
            id: Date.now(),
            ...req.body,
        };
        comments.push(newComment);
        fs.writeFile('./comments.json', JSON.stringify(comments, null, 4), (err) => {
            if (err) {
                res.status(500).send('Server Error');
                return;
            }
            res.send(newComment);
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});