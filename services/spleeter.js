const { spawn } = require('child_process');
const { resolve } = require('path');

exports.spawnSpleeter = (bitrate, codec, stems, file) => {
    return new Promise ((resolve, reject) => {
        let dataToSend;
        const python = spawn('python', ['python_scripts/spleeter/__main__.py', 'separate', '-i', file, '-p', stems, '-o', 'audio_separated']);
        python.stdout.on('data', function (data) {
            console.log('Pipe data from python script ...');
            dataToSend = data.toString();
        });
        python.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
            console.log('Finalizado')
            resolve(code);
        });
        python.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
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