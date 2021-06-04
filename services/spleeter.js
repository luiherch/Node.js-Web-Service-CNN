const { spawn } = require('child_process');
const AudioFile = require('../models/audioFile');
const path = require('path');

exports.spawnSpleeter = (id, bitrate, codec, stems) => {
    /*
    id: id del audio de la base de datos
    */
    return new Promise ((resolve, reject) => {
        AudioFile.findById(id, (err, audioFile) => {
            if (err){
                console.log(err);
            }
            else{
                let audioPath = audioFile.path;
                let dataToSend;
                const python = spawn('python', ['python_scripts/spleeter/__main__.py', 'separate', '-i', audioPath, '-p', stems, '-o', 'audio_separated']);
                python.stdout.on('data', function (data) {
                    console.log('Pipe data from python script ...');
                    dataToSend = data.toString();
                });
                python.on('close', (code) => {
                    console.log(`child process close all stdio with code ${code}`);
                    console.log('Finalizado')
                    resolve([code, path.parse(audioFile.title).name,path.parse(audioPath).name]);
                });
                python.stderr.on('data', (data) => {
                    console.error(`stderr: ${data}`);
                });
            }
        });
    })
}

exports.hilos = (hilo) => {
    let stems;
    switch (hilo){
        case '2':
            stems = 'spleeter:2stems';
            break;
        case '4':
            stems = 'spleeter:4stems';
            break;
        case '5':
            stems = 'spleeter:5stems';
            break;
        default:
            stems = 'spleeter:2stems';
            break;
    }
    return stems;
}