const mongoose = require('mongoose');
const AudioFile = require('../models/audioFile')

exports.saveAudioFile = (audio, nombre, stems, bitrate, codec) =>{
    return new Promise ((resolve, reject) => {
        const audioPath = audio.path;
        const audioFile = new AudioFile({
            title: nombre,
            path: audioPath,
            duration: 100,
            stems: stems,
            bitrate: bitrate,
            codec: codec,
            rating: null
        });
        audioFile.save().then(result => {
            console.log("Mongoose: Audio File added to the db");
            resolve(result);
        }).catch(err => reject(err));
    });
}