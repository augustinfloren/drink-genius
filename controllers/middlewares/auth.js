const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

function isAuthed (req, res, next) {
  try {
    const token = req.cookies.jwt;
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = verifiedToken.userId;
    const roleId = verifiedToken.roleId;
    res.locals.userId = userId;
    res.locals.roleId = roleId;
    next()
  } catch(error) {
    res.render('errorPage', { errorMessage: "Vous devez être connecté" });
  }
};

function isAdmin (req, res, next) {
  try {
    const token = req.cookies.jwt;
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = verifiedToken.userId;
    const roleId = verifiedToken.roleId;
    if(roleId === 1){
      res.locals.userId = userId;
      res.locals.roleId = roleId;
      next();
    } else {
        res.render('errorPage', {errorMessage: "Vous n'avez pas les droits pour accéder à cette page."});
    }
  } catch(error) {
    res.render('errorPage', { errorMessage: "Vous devez être connecté" });
  }
};

module.exports = {
  isAuthed,
  isAdmin,
}