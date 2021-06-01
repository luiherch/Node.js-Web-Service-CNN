exports.ensureAuth = (req, res, next) => {
    if (!req.session.logged){
        res.redirect('/login');
    }
    else{
        next();
    }
}