const client = require('.././models/dbClient');

const loadSessionUserInLocals = async (req, res, next) => {
  console.log(req.session)
  if (req.session.user.id) { // Si il y a un userId, ça veut dire que le visiteur est CONNECTÉ !!
    const sqlQuery = "SELECT * FROM user WHERE id=$";
    const value = req.session.user.id;
    const user = await client.query( sqlQuery, value )
    res.locals.user = user; // J'ajoute cet utilisateur dans les locals ! // => plutôt à destination des views EJS
    req.user = user; // On stock régulièrement le user dans `req` ==> pour les middlewares suivants.
  }

  next(); // Appelle la suite, donc le router
};

module.exports = loadSessionUserInLocals;