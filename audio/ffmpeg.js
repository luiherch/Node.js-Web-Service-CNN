const ffmpeg = require('fluent-ffmpeg');
const { exec } = require('child_process');

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
  var stream  = fs.createWriteStream(process.cwd() + '/audio_separated/test.wav');
  const a = ffmpeg()
    .input(path)
    .output(stream)
    .run();
  
    //exec(a, (error, stdout, stderr)=>{

}