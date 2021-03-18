
class Audio_file {
    constructor (path, duration) {
        this.path = path;
        this.duration = duration;
        this.rating = null;
    }

    set_rating (rating){
        if (rating){
            this.rating = rating;
        }
    }

    persist (){
        database.collection('audios').insertOne(this).then(result => {console.log(result)}).catch( error => {console.log(error)});
    }
}

module.exports = Audio_file;