const userDataMapper = require('../models/userDataMapper');
const bcrypt = require('bcrypt');

const userController = {
  async signInPage (req, res){
    const newUser = req.body;
    if(newUser.password === newUser.confirmation){
      newUser.password = await bcrypt.hash(newUser.password, parseInt(process.env.SALT));
      const signedUser = await userDataMapper.addOneUser(newUser);
      if(signedUser === 1){
        req.session.user = newUser;
        res.render('homePage');
      } else {
        res.status(500).redirect('/signin');
      }
    }
  },

  async logInPage(req, res){
    const { email, password } = req.body;
    const userInfo = await userDataMapper.getUserByEmail(email);
    const correctPassword = await bcrypt.compare(password, userInfo.password);
    if(correctPassword){
      delete userInfo.password;
      req.session.user = userInfo;
      console.log(req.session.user);
      res.render('homePage');
    } else {
      res.status(400).redirect('/login');
    }
  },
  
  async getProfilePage (req, res) {
    const userId = req.session.user.id;
    const userInfo = await userDataMapper.getOneUser(userId);
    res.render('profilePage', {userInfo});
  },
}

module.exports = userController;
