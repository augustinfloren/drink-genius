const client = require('../models/dbClient');
const jwt = require('jsonwebtoken');

const checkToken = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const token = req.cookies.jwt;
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = verifiedToken.userId;
      const roleId = verifiedToken.roleId;
      if (verifiedToken) {
        res.locals.isAuthed = true;
        res.locals.userId = userId;
        res.locals.roleId = roleId;
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