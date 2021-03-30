class AudioSeparated {
    constructor (path, ref_id, bitrate, codec, stem){
        //ref_id es el id del AudioFile del cual proviene
        this.path = path;
        this.ref_id = ref_id;
        this.bitrate = bitrate;
        this.codec = codec;
        this.stem = stem;
    }

    persist (database){
        database.collection('separated').insertOne(this).then(result => {console.log(result)}).catch( error => {console.log(error)});
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

module.exports = AudioSeparated;