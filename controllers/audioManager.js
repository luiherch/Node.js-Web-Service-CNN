const AudioFile = require ('../models/audioFile');
const eController = require ('./errorController');

exports.manageAudio = (req, res, next) => {
    const audioTrack = req.file;
    const stems = req.body.stems;
    const bitrate = req.body.bitrate;
    const codec = req.body.codec;
    if (!audioTrack) {
        //422 entidad improcesable
        return eController.e422;
    } else{
        const audioPath = audioTrack.path;
        const audioFile = new AudioFile({
            path: audioPath,
            duration: 100,
            stems: stems,
            bitrate: bitrate,
            codec: codec
        });
        audioFile.persist(req.app.database);
        //audioFile.findId(req.app.database, "6057403c300fd716e880c870");
    }
}

