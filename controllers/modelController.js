const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const eController = require ('./errorController');

const ffmpeg = require ('../audio/ffmpeg');
const { tensor1d } = require('@tensorflow/tfjs-node');

exports.serveCNN = (req, res, next) => {
    // const path;
    // const signatureKey;
    // const input;

    //segun doc oficial de tensorflow
    //const model = await tf.node.loadSavedModel(path, signatureKey);
    //const output = model.predict(input);

    const cargarDatos = () => {
        let flag = false;
        let loadModel = new Promise((resolve, reject) => {
            //cargar el modelo
            //const model = await tf.node.loadSavedModel(path, signatureKey);
            resolve('Todo bien');
        });
        let loadTrack = new Promise((resolve, reject) => {
            //cargar la pista de audio
            reject('La pista no se ha cargado');
        });
    
        Promise.all([loadModel, loadTrack]).then(values => {
                console.log(values);
                flag = true;
                console.log(flag);
                return flag;
            }).then(values => {
                console.log(flag);
                console.log('segundo then');
                //const output = model.predict(input);
                //return output;
            }).catch(e => {
                console.log(e);
                flag = false;
                console.log(flag);
                eController.e500(req, res, next);
            });
    }


    cargarDatos();
}

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

