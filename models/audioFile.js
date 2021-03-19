
class AudioFile {
    constructor (path, duration, stems) {
        this.path = path;
        this.duration = duration;
        this.stems = stems;
        this.rating = null;
    }

    setRating (rating){
        if (rating){
            this.rating = rating;
        }
    }

    persist (){
        database.collection('audios').insertOne(this).then(result => {console.log(result)}).catch( error => {console.log(error)});
    }
}

class AudioSeparated {
    constructor (path, ref_id){
        //ref_id es el id del Audio_file del cual proviene
        this.path = path;
        this.ref_id = ref_id;
    }

    persist (){

    }
}

module.exports = AudioFile;