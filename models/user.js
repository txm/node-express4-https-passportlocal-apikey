var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var uuid = require('uuid');


var middleware = require('./middleware');
 
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    api              : {
        key          : String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// 
userSchema.methods.generateKey = function(password) {
    return uuid.v4();
};

// 
userSchema.methods.validKey = function(apikey) {
    return (apikey === this.api.key);
};


// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
