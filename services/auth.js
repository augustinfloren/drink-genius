const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const auth = {

  isAuthed : (req, res, next) => {
    try {
      if (res.locals.isAuthed) {
        next()
      }
    } catch(error) {
      res.render('errorPage', { errorMessage: "Vous devez être connecté" });
    }
  },

  isAdmin : (req, res, next) => {
    try {
      if (res.locals.isAuthed) {
        if(res.locals.roleId === 1){
          next();
        } else {
          res.render('errorPage', {errorMessage: "Vous n'avez pas les droits pour accéder à cette page."});
        }
      }
    } catch(error) {
      res.render('errorPage', { errorMessage: "Vous devez être connecté" });
    }
  },
}

module.exports = auth;