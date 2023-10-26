const client = require('../models/dbClient');
const jwt = require('jsonwebtoken');

const checkToken = async (req, res, next) => {
  try {
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
  } catch (err) {
    res.locals.isAuthed = false;
  }
};

module.exports = checkToken;