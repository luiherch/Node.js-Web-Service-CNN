const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const eController = require ('./errorController');
const { spawn } = require('child_process');

const ffmpeg = require ('../audio/ffmpeg');
const { tensor1d } = require('@tensorflow/tfjs-node');

exports.childProcess = (req, res, next) => {
    //suponemos que nos entran las siguientes variables del formulario obtenidas de req:
    let hilos = 5;
    let bitrate = 96;
    let codec = 'mp3';
    let dataToSend;
    const python = spawn('python', ['python_scripts/test.py', hilos, bitrate]);
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
       });
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend)
        });
}

exports.spleeter = (req, res, next) => {
    let hilos = 5;
    let bitrate = 96;
    let codec = 'mp3';
    let dataToSend;
    const python = spawn('python', ['python_scripts/spleeter/__main__.py', 'separate', '-i', 'audio_example.mp3', '-p', 'spleeter:2stems', '-o', 'audio_separated']);
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
       });
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend)
        });
    python.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        });
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

