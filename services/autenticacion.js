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
    res.setHeader('Access-Control-Allow-Headers', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
}

exports.validateToken = (req, res, next) => {
    const token = req.body.webtoken;
    let decToken;
    try{
        decToken = jwt.verify(token, 'fideo kojima')
    } catch(err){
        console.log(err);
    }

    if(!decToken){
        console.log('no autenticado');
    }
    else{
        //req.id = decToken.id;
        console.log('token validado');
        next();
    }

}