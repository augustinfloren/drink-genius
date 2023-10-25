const client = require('../models/dbClient');
const jwt = require('jsonwebtoken');

const checkAuth = async (req, res, next) => {
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (verifiedToken) {
      res.locals.isAuthed = true;
    } else {
      res.locals.isAuthed = false;
    }
  }
  next();
};

module.exports = checkAuth;