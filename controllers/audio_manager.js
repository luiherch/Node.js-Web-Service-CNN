const Audio_file = require ('../models/audio_file');

exports.manage_audio = (req, res, next) => {
    const audio_track = req.file;
    console.log(audio_track);
    if (!audio_track) {
        //422 entidad improcesable
        return res.status(422).send('Entidad improcesable');
    } else{
        const audio_path = audio_track.path;
        const audio_file = new Audio_file({
            path: audio_path,
            duration: 100
        });
    }
}

