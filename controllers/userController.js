const User = require('../models/Users');
const {validationResult} = require('express-validator/check');

exports.signup = (req, res, next) => {
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()){
        return res.status(422).send({
            message: valErrors.array()
        })
    }
    let email = req.body.email;
    User.findOne({email: email}, (err, user)=>{
        if (!user){
            let user = new User();
            user.email = req.body.email;
            let pw = req.body.pw;
            user.setPassword(pw, user);
            user.save().then(result => {
                res.status(201).send({ 
                    message : "User added successfully."
                }); 
            }).catch(err => {
                res.status(400).send({ 
                    message : "Mala suerte amigo."
                }); 
            })
        }
        else{
            res.status(400).send({ 
                message : "Usuario ya existe"
            }); 
        }
    });
    
}

exports.login = (req, res, next) => {
    let email = req.body.email;
    let pw = req.body.pw;
    User.findOne({email:email}, (err, user)=>{
        if (user === null){
            return res.status(400).send({ 
                message : "User not found."
            }); 
        }
        else{
            if (user.validPassword(pw, user)){
                req.session.logged = true;
                req.session.user = user;
                return req.session.save((err) => {
                    res.redirect('/main');
                })
                
            }
            else {
                return res.status(401).send({ 
                    message : "Wrong Password"
                }); 
            }
        }
    });
}

exports.logout = (req, res, next) => {
    req.session.destroy( (err) => {
        console.log(err);
        res.redirect('/main');
    });
}