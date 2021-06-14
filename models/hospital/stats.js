const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Hospital_id:{type:Number},
    Patient_Name:{type:String},
    Patient_Id:{type:String},
    Age:{type:Number},
    Adhar_Number:{type:Number},
    Date_of_admission:{type:Date},
    Admission_detail:{type:String},
    Discharge_Date:{type:Date},
    Patient_Status:{type:String}

}, {collection:"PatientDetails"},
)
const HospitalDashboard = mongoose.connection.useDb('HospitalDashboard');
module.exports = HospitalDashboard.model('Profile', profileSchema);
