const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    const verifiedToken = jwt.veryfy(token, 'secret');
    const userId = verifiedToken.userId;
    req.auth = {
      userId: userId
    };
  } catch(error) {
    res.status(401).json({error});
  }
};