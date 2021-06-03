const User = require('../models/Users');
const jwt = require('jsonwebtoken');

exports.restLogin = (req, res, next) => {
    let email = req.body.email;
    let pw = req.body.pw;
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
                return res.status(201).json({token:jwtoken, id: user._id.toString()})              
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
    db.saveAudioFile(audioTrack, nombre, hilos, bitrate, codec).then( result => {
        console.log(result);
        let path = process.cwd() + '/mp3_sample';
        let file = 'audio_example.mp3'      
        let stems = spleeter.hilos(hilos);
        spleeter.spawnSpleeter(1,1,stems,file)
        .then((code)=>{
            console.log(code);
            zips.sendZip(file,res,path);
        })
        .catch((err)=>{
            console.log(err);
        })
    }).catch(err => {
        console.log(err)
    })
}