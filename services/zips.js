const archiver = require('archiver');

exports.sendZip = (fileName, res, path) => {
    const zip = archiver('zip');
    //streaming data
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="'+ fileName +'.zip"');
    zip.pipe(res);
    console.log(path);
    zip.directory('audio_separated/' +path , 'Audios').finalize();
}