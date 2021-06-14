const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Hospital_id:{type:Number , unique:true},
        Hospital_Name:{type:String},
        password:{type:String},
        Contact_Number:{type:Number},
        License_Number:{type:Number },
        Registration_Number:{type:Number},
        Hospital_Type:{type:String},
        Address:{type:String},
        City:{type:String},
        State:{type:String},
        Pincode:{type:Number}
},  { collection: 'HospitalSignup'},
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

const HospitalDashboard = mongoose.connection.useDb('HospitalDashboard');
module.exports = HospitalDashboard.model('User', userSchema);
