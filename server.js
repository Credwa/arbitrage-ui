const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 8080;
let app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/dist/'));


// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE')
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };