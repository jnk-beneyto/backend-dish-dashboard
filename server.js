const helmet = require('helmet');
const cors = require('cors');
const express = require("express");
const app = express();

//middlewares

app.use(express.json());
app.use(helmet());
app.use(cors());

//Welcoming route

app.get('/', function (req, res) {
  res.send({
      status: 200,
      message: "Welcome aboard!"
  });
  res.end();
});

module.exports = app;