const userDataMapper = require('../models/userDataMapper');
const bcrypt = require('bcrypt');

const userController = {
  async signUpAndRedirect (req, res, next){
    const newUser = req.body;
    console.log(req.body)
    newUser.roleId = 2;
    if(newUser.password === newUser.confirmation){
      newUser.password = await bcrypt.hash(newUser.password, parseInt(process.env.SALT));
      const { error,result } = await userDataMapper.addOneUser(newUser);
      if (error) {
        res.send(error);
      } else {
        const userData = result[0];
        delete userData.password;
        req.session.user = userData;
        res.status(200).redirect('/');
      }
    }
  },

  async logInAndRedirect(req, res, next){
    const { email, password } = req.body;
    const { error, user } = await userDataMapper.getUserByEmail(email);
    if(error){
      res.send(error);
    } else {
      const correctPassword = await bcrypt.compare(password, user.password);
      if(correctPassword){
        delete user.password;
        req.session.user = user;
        res.status(200).redirect('/');
      } else {
        res.send(error);
      }
    }
  },

  async getProfilePage (req, res) {
    const userId = req.session.user.id;
    res.render('profilePage', {userId});
  },

  async logOutAndRedirect(req, res){
    req.session.user = null;
    res.redirect('/')
  }
}

module.exports = userController;
