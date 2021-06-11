const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type:String, unique:true},
    First_Name: {type: String},
    Last_name: {type:String},
    Mobile_No:{type:Number},
    email: {type:String, 
            unique:true, 
            match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password: {type: String},
    Address: {type:String},
    City: {type: String},
    State: {type: String},
    Zip : {type: Number}
},  { collection: 'Publicsignup'},
    {timestamps: true}
)

userSchema.pre('save', function(next) {
    if(!this.isModified('password')) {
        return next()
    }

    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if(err) {
            return next(err);
        }

        this.password = passwordHash;
        next();
    });
});

userSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if(err) {
            return cb(err);
        }
        else {
            if(!isMatch) {
                return cb(null, isMatch)
            }
            return cb(null, this);
        }
    })
};

const Publicdashboard = mongoose.connection.useDb('Publicdashboard');
module.exports = Publicdashboard.model('User', userSchema);
