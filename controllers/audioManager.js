const AudioFile = require ('../models/audioFile');
const eController = require ('./errorController');

exports.manageAudio = (req, res, next) => {
    const audioTrack = req.file;
    const stems = req.body.stems;
    console.log(audio_track);
    if (!audioTrack) {
        //422 entidad improcesable
        return eController.e422;
    } else{
        const audioPath = audioTrack.path;
        const audioFile = new AudioFile({
            path: audioPath,
            duration: 100,
            stems: stems
        });
        audioFile.persist();
    }
}

