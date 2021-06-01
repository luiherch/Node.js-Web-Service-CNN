const User = require('../models/Users');

exports.signup = (req, res, next) => {
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
                    res.status(200).send({ 
                        message : "User Logged In", 
                    }) 
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