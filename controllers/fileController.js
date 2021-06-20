const archiver = require ('archiver');
const zips = require('../services/zips');
const spleeter = require('../services/spleeter');
const eController = require ('./errorController');
const db = require('../services/db');

exports.sendZip = (req, res, next) => {
    /*
    Crea el zip y lo va stremeando a la respuesta
    */
    const zip = archiver('zip');
    //streaming data
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="example.zip"');
    zip.pipe(res);
    zip.directory(process.cwd() + '/mp3_sample' , 'Audios').finalize();
}

exports.fullFunction = (req, res, next) => {
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