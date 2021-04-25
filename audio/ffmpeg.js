const ffmpeg = require('fluent-ffmpeg');
const { exec } = require('child_process');

const arrays = require('../util/arrays');


const fs = require('fs');

exports.load = (path) => {
    ffmpeg.ffprobe(path, (err, data)=>{
        if (err) {
            console.log("Data not Found: " + err);
            return false
          } else {
            console.log(data)
            //const streams = data.streams
            for (stream in data.streams){
              if (data.streams[stream]['codec_type'] == 'audio'){
                const n_channels = da['channels']
              }
              const sample_rate = data.streams[stream]['sample_rate']
              output_kwargs = {'format': 'f32le', 'ar': sample_rate}
              const pr = ffmpeg().input(path).output('pipe:').run()
              console.log(pr)
            } 
          }
    })
}

exports.test = (path, kwargs) => {
  var data = [];
  var readStream  = fs.createReadStream(path);
  var writeStream = fs.createWriteStream('audio_separated/test.raw');
  var command = ffmpeg(readStream)
    .addOption('-ar', '44100')
    .addOption('-ac 2')
    .format('f32le')
    .on('start', (commandLine) => {
      console.log('FFmpeg Command:' + commandLine);
    }) 
    .on('error', (err, stdout, stderr) => {
      console.log('An error occurred: ' + err.message);
    })   
    .on('end', (stdout, stderr) => {        
      var returnedText = stderr;
      console.log(returnedText);

      var rs = fs.createReadStream('audio_separated/test.raw')
      rs.on('data', chunk => {
        console.log('---------------------------------');
        console.log(chunk);
        chunkLength = Buffer.byteLength(chunk)
        for (var j = 0; j<chunkLength/4; j += 1){
          data[j] = Buffer.from(chunk).readFloatLE(j*4)
        }
        dataReshaped = arrays.reshape(data, 2)
        console.log(dataReshaped)
        //AHORA ENVIARLA A ALGUN LADO PORQUE LA ESTOY MACHACANDO ENCIMA DE SI MISMA Y PERDIENDO LOS DATOS
        console.log('---------------------------------');
      });
      rs.on('end', () => {
        console.log('Read Stream finalizado')
      });
    })
    .pipe(writeStream, { end: true });

}