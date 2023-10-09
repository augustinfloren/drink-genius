const mainController = {
  async getHomePage (req,res){
    const message = req.session.errorMessage
    res.render('homePage', {message});
  },

  async getLegalNoticePage (req,res){
    res.render('legalNoticePage');
  }
};

module.exports = mainController;