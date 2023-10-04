const mainController = {
  async getHomePage (req,res){
    const message = req.session.errorMessage
    res.render('homePage', {message});
  }
};

module.exports = mainController;