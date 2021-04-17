const { repeat } = require("../util/path")

 
exports.toStereo = (waveform) => {
    /*
    Convierte una waveform a stereo, duplicando el canal si es mono
    o truncando si hay demasiados canales
    */
    if (waveform.shape[1] == 1){
        return repeat(waveform, 2, axis=-1);
    }

    if (waveform.shape[1] > 2){
        return waveform[:, :2];
    }
    return waveform;
}