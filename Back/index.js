const express = require('express');
const app = express();
const session = require('express-session');
const bcrypt = require('bcrypt');
const pg = require('pg');
const router = require('./router');

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: dotenv
}));