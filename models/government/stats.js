const mongoose = require('mongoose')


const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    State: {type:String, required:true},
    Population: {type: Number, required:true},
    Confirmed: {type: Number, required:true},
    Recovered: {type: Number, required:true},
    Deaths:{type: Number, required:true},
    Active:{type: Number, required:true},
    Tested:{type: Number, required:true},
    Last_Updated_Time:{type: String}
},  { collection: 'Govcovidvisualization'}
)

const governmentdashboard = mongoose.connection.useDb('governmentdashboard');
module.exports = governmentdashboard.model('Profile', profileSchema);
