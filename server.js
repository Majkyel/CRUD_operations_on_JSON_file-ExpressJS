const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Hello world!');
});

app.get('/getNote', function(req, res) {
    fs.readFile('./test.json', 'utf8', function(err, data) {
        if (err) throw err;
        let readData = data;
        res.send(readData);
    });
});

app.post('/updateNote/:note', function(req, res) {
    let writeData = '';
    writeData += req.params.note;
    fs.writeFile('./test.json', writeData, function(err) {
        if (err) throw err;
        console.log('File uploaded...');
        res.send('File uploaded!.');
    });
});

app.listen(3000);

app.use(function(req, res, next) {
    res.status(404).send('I am sorry check correct path!');
});
