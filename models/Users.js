const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    email:{
        type:String,
        required: true
    },
    count: Number,
    salt: String,
    hash: String
});

userSchema.methods.setPassword = (pw, user) => {
    user.salt = crypto.randomBytes(16).toString('hex'); 
    user.hash = crypto.pbkdf2Sync(pw, user.salt,  
    1000, 64, `sha512`).toString(`hex`);

};

userSchema.methods.validPassword = (pw, user) => { 
    let hash = crypto.pbkdf2Sync(pw,  
    user.salt, 1000, 64, `sha512`).toString(`hex`); 
    return user.hash === hash; 
}; 

module.exports = mongoose.model('User', userSchema);