const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const passport = require('passport');
const request = require('request');

const app = express();

//====EXPRESS CONFIG====//
app.use(cors());

app.get('/', (req, res) => {
    console.log("Request received.");
    res.send("Received");
});

app.listen(3000, console.log("Listening on port 3000"));