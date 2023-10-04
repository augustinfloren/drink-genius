const client = require('.././models/dbClient');

const loadSessionUserInLocals = async (req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
    req.user = user;
  }

  next();
};

module.exports = loadSessionUserInLocals;