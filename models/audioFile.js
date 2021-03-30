
class AudioFile {
    constructor (path, duration, stems, bitrate, codec) {
        this.path = path;
        this.duration = duration;
        this.stems = stems;
        this.bitrate = bitrate;
        this.codec = codec;
        this.rating = null;
    }

    setRating (rating){
        if (rating){
            this.rating = rating;
        }
    }

    persist (database){
        database.collection('audios').insertOne(this).then(result => {console.log(result)}).catch( error => {console.log(error)});
    }

    static findId(database, id){
        const file = database.collection('audios').findOne({
            _id: id
        });
        if (file) {
            console.log(file.path);
        }
    }
}

module.exports = AudioFile;