const mainController = {
  async getHomePage (req,res){
    const message = req.session.errorMessage;
    let currentRoute = 'accueil';
    res.render('homePage', {message, currentRoute});
  },

  async getLegalNoticePage (req,res){
    res.render('legalNoticePage');
  }
};

module.exports = mainController;