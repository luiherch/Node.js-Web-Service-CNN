const ffmpeg = require('fluent-ffmpeg');
const { exec } = require('child_process');
const { FFmpeg, ffprobe, ffprobeSync } = require("kiss-ffmpeg");

const fs = require('fs');
const { FfmpegCommand } = require('fluent-ffmpeg');

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
  // var readStream = fs.createReadStream(process.cwd() + '/audio_separated/audio_example.mp3');
  // var data = '';
  // readStream.setEncoding('UTF8')
  // readStream.on('data', (chunk) => {
  //   data += chunk;
  // });
  // readStream.on('end', () =>{
  //   bytes = Uint8Array.from(data, c => c.charCodeAt(0))
  //   floats = new Float32Array(bytes.buffer)
  //   console.log(floats);
  //   console.log([floats])
  // });
  var readStream  = fs.createReadStream(path);
  var writeStream = fs.createWriteStream('audio_separated/test.raw');
  // ffmpeg(stream)
  //   .outputOptions([
  //     '-format f32le',
  //     '-ar 44100'
  //   ])
  //   .on('end', () => {
  //     console.log('Proceso finalizado')
  //     console.log(data)
  //   })
  //   .pipe(data, { end: true });
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
        let a = Buffer.from(chunk).readFloatLE();
        let b = Buffer.from(chunk).readFloatLE(4);
        for (var j = 0; j<chunkLength/4; j += 1){
          data[j] = Buffer.from(chunk).readFloatLE(j*4)
        }
        console.log(chunkLength)
        console.log(a)
        console.log(b)
        console.log(data)
        console.log('---------------------------------');
      });
      rs.on('end', () => {
        console.log('Read Stream finalizado')
      });
    })
    .on('data', () => {

    })
    .pipe(writeStream, { end: true });


  
    //exec(a, (error, stdout, stderr)=>{

}