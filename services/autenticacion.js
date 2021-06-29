const jwt = require('jsonwebtoken');

exports.ensureAuth = (req, res, next) => {
    if (!req.session.logged){
        res.redirect('/login');
    }
    else{
        next();
    }
}

exports.corsHeaders = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
}

exports.validateToken = (req, res, next) => {
    const wtoken = req.headers['access-token'];
    console.log(wtoken)
    let decToken;
    try{
        decToken = jwt.verify(wtoken, 'fideo kojima')
    } catch(err){
        console.log(err);
    }
    if(!decToken){
        console.log('No autenticado');
        return res.status(401).send({
            message: 'Authentification missing'
        })
    }
    else{
        console.log('Token validado');
        next();
    }
}