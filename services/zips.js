const archiver = require('archiver');

exports.sendZip = (fileName, res, path) => {
    const zip = archiver('zip');
    //streaming data
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="'+ fileName +'"');
    zip.pipe(res);
    zip.directory(path , 'Audios').finalize();
}