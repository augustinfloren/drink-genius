const userDataMapper = require('../models/userDataMapper');
const bcrypt = require('bcrypt');

const userController = {
  async signUpAndRedirect (req, res, next){
    const newUser = req.body;
    newUser.roleId = 2;
    if(newUser.password === newUser.confirmation){
      newUser.password = await bcrypt.hash(newUser.password, parseInt(process.env.SALT));
      const { error,result } = await userDataMapper.addOneUser(newUser);
      if (error) {
        res.json(error);
      } else {
        const user = result[0];
        delete user.password;
        res.status(200).redirect('/');
      }
    }
  },

  async logInAndRedirect(req, res, next){
    const { email, password } = req.body;
    const { error, result } = await userDataMapper.getUserByEmail(email);
    if (error) {
      res.json(error);
    }
    else {
      const correctPassword = await bcrypt.compare(password, result.password);
      if(correctPassword){
        delete result.password;
        req.session.user = result;
        res.status(200).redirect('/');
      }
      else {
        error = "Mot de passe incorrect";
        res.json(error);
      }
    }
  },

  async getProfilePage (req, res) {
    const userInfo = req.session.user;
    res.render('profilePage', {userInfo});
  },

  async logOutAndRedirect(req, res){
    req.session.user = null;
    res.redirect('/')
  },

  async getFavouriteCocktails(req, res){
    const userId = req.session.user.id;
    const favourites = await userDataMapper.getFavouriteCocktailsByUser(userId)
    res.json(favourites);
  },

  async addNewCocktail(req, res){
    
  },

  async getCocktailsCreatedByUser(req, res){
    const userId = req.session.user.id;
    const cocktails = await userDataMapper.getCocktailByUserId(userId);
    res.json(cocktails);
  }
}

module.exports = userController;
