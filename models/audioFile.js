const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const audioSchema = new Schema ({
    title: String,
    path: String,
    duration: Number,
    stems: Number,
    bitrate: Number,
    codec: String,
    rating: Number
});

module.exports = mongoose.model('Audio', audioSchema);