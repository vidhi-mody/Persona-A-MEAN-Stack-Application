var mongoose= require('mongoose');
var bcrypt = require('bcrypt');

var schema = new mongoose.Schema({
    email : {
        type:String, 
        require:true
    },
    username: {
        type:String, 
        require:true
    },
    password:{
        type:String, 
        require:true
    },
    creation_dt:{
        type:Date, 
        require:true
    },
    name: {
        type: String,
        default: 'Anonymous'
    },
    website: {
        type: String,
        default: 'https://foreignadmits.com'
    },
    summary: {
        type: String,
        default: 'Looking for study abroad guidance'
      },
    degree: {
        type: String,
        default: 'None'
    },
    specialization: {
        type: String,
        default: 'None'
    },
    planning: {
        type: String,
        default: 'GRE/ GMAT'
    }
})

schema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

schema.methods.isValid = function(hashedPasssword){
    return bcrypt.compareSync(hashedPasssword, this.password);
}

module.exports = mongoose.model('User',schema)