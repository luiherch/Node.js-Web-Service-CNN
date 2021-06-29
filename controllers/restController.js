const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const spleeter = require('../services/spleeter');
const eController = require('./errorController');
const db = require('../services/db');
const zips = require('../services/zips');
const {validationResult} = require('express-validator/check');

exports.restLogin = (req, res, next) => {
    let email = req.body.email;
    let pw = req.body.pw;
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()){
        return res.status(422).send({
            message: valErrors.array()
        })
    }

    console.log(email);
    console.log(pw);
    User.findOne({email:email}, (err, user)=>{
        if (user === null){
            return res.status(400).send({ 
                message : "User not found."
            }); 
        }
        else{
            if (user.validPassword(pw, user)){
                const jwtoken = jwt.sign({
                    id: user._id.toString()
                }, 'fideo kojima', {
                    expiresIn:'1h'
                });
                return res.status(200).json({token:jwtoken, id: user._id.toString()})              
            }
            else {
                return res.status(401).send({ 
                    message : "Wrong Password"
                }); 
            }
        }
    });

}

exports.restSpleeter = (req, res, next) => {
    const audioTrack = req.file;
    const hilos = req.body.stems;
    const bitrate = req.body.bitrate;
    const codec = req.body.codec;
    console.log('Hilos: '+hilos);
    if (!audioTrack) {
        //422 entidad improcesable
        return eController.e422;
    }
    const nombre = req.file.originalname;
    db.saveAudioFile(audioTrack, nombre, hilos, bitrate, codec)
        .then( id => {
            console.log(id); 
            let stems = spleeter.hilos(hilos);
            spleeter.spawnSpleeter(id, bitrate, codec, stems)
        .then(code =>{
            zips.sendZip(code[1],res,code[2]);
        })
        .catch((err)=>{
            console.log(err);
        })
    }).catch(err => {
        console.log(err)
    })
}