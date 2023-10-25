const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = verifiedToken.userId;
    res.locals.isAuthenticated = true;
    res.locals.userId = userId;
    next()
  } catch(error) {
    res.locals.isAuthenticated = false;
    next()
  }
};