const userDataMapper = require('../models/userDataMapper');
const bcrypt = require('bcrypt');

const userController = {
  async signInPage (req, res){
    const newUser = req.body;
    console.log(newUser)
    if(newUser.password === newUser.confirmation){
      newUser.password = await bcrypt.hash(newUser.password, parseInt(process.env.SALT));
      const signedUser = await userDataMapper.addOneUser(newUser);
      if(signedUser === 1){
        delete newUser.password;
        delete newUser.confirmation;
        req.session.user = newUser;
        res.render('homePage', {success:"Votre compte a bien été créé !"});
      } else {
        req.session.errorMessage = 'Error'
        res.status(500).redirect('/');
      }
    }
  },

  async logInPage(req, res){
    const { email, password } = req.body;
    const userInfo = await userDataMapper.getUserByEmail(email);
    if(userInfo){
      const correctPassword = await bcrypt.compare(password, userInfo.password);
        if(correctPassword){
        delete userInfo.password;
        req.session.user = userInfo;
        console.log(req.session.user);
        res.render('homePage');
        } else {
        res.status(400).redirect('/');
        }
    } else {
      res.status(500).redirect('/')
    }
  },

  async getProfilePage (req, res) {
    const userId = req.session.user.id;
    res.render('profilePage', {userId});
  },

  async logOutPage(req, res){
    req.session.user = [];
    console.log(req.session.user)
    res.redirect('/')
  }
}

module.exports = userController;
