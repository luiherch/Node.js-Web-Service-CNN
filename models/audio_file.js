
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
}

module.exports = Audio_file;