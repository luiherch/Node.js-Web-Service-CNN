const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

exports.loadModel = (aud) => {
    const camino = process.cwd() + '/modelopb/2stems';
    const input = process.cwd() + '/mp3_sample/audio_example.mp3';
    console.log(camino);
    //const model = tf.node.loadSavedModel(camino, 'serve', 'serving_default');
    //const output = model.predict([input_tensor]);

    tf.node.getMetaGraphsFromSavedModel(camino)
    .then(modelInfo => {
        console.log('modelInfo', modelInfo)
        console.log('tags', modelInfo[0].tags)
        console.log('signatureDefs', modelInfo[0].signatureDefs)
        // model load
        return tf.node.loadSavedModel(camino)
    }).then(model => {
        // load mp3
        // prediction
        //console.log(aud)
        //const inputTensor = tf.tensor2d(waveform.data, [ waveform.data.length, 1], 'float32' );
        tens = tf.tensor(['id'])
        const inputs = {
            audio_id: tens,
            mix_spectrogram: tf.randomNormal([2, 512, 1024, 2]),
            mix_stft: tf.randomNormal([2, 2049, 2]),
            waveform: tf.randomNormal([2, 2])
        };
        const output = model.predict(inputs)
        console.log(output)
    }).catch(error => {
      console.error(error.stack);
    });

    
}

