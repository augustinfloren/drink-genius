// VERIFIE SI UN UTILISATEUR EST CONNECTE
function isAuthed(req, res, next){
    if (!req.session.user){
        res.redirect('/');
    } else {
        next();
    }
};

// VERIFIE SI L'UTILISATEUR CONNECTE EST ADMIN
function isAdmin(req, res, next){
    if(req.session.user && req.session.user.role_id === 1){
        next();
    } else {
        res.status(404).render('404');
    }
};

module.exports = {
    isAuthed,
    isAdmin
}