
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
}

class AudioSeparated {
    constructor (path, ref_id){
        //ref_id es el id del AudioFile del cual proviene
        this.path = path;
        this.ref_id = ref_id;
    }

    persist (){

    }
}

module.exports = AudioFile;