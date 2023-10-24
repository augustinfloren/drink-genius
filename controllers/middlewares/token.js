const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifiedToken)
    // const userId = verifiedToken.userId;
    // req.auth = {
    //   userId: userId
    // };
  } catch(error) {
    res.status(401).json({error});
  }
};