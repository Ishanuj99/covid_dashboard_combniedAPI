const express= require('express')
const router = express.Router()
const mongoose=require('mongoose')
const basicDetails = require('../../models/hospital/basicDetails')
const passport = require('passport');
require('../../passportpublic')

const Profile = require("../../models/hospital/stats")
router.get('/patientdetails', passport.authenticate('jwt', {session:false}),(req, res, next)=>
{
    Profile.find()
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            stats: docs.map(doc =>{
                return {
                    _id:doc.id,
                    username:doc.username,
                    Patient_Name:doc.Patient_Name,  
                    Patient_Id:doc.Patient_Id,
                    Age:doc.Age,
                    Adhar_Number:doc.Adhar_Number,
                    Date_of_admission:doc.Date_of_admission,
                    Admission_detail:doc.Admission_detail,
                    Discharge_Date:doc.Discharge_Date,
                    Patient_Status:doc.Patient_Status,
                    request: {
                        type: "GET",
                        url: "https://covid-dash-combined.herokuapp.com/hospital/stats/patientdetails/" + doc._id
                      }
                }
            })
        }
        console.log(docs)
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})



router.post('/patientdetails', passport.authenticate('jwt', {session:false}), (req, res, next)=>
{
    const person = new Profile({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        Patient_Name:req.body.Patient_Name,
        Patient_Id:req.body.Patient_Id,
        Age:req.body.Age,
        Adhar_Number:req.body.Adhar_Number,
        Data_of_admission:req.body.Date_of_admission,
        Admission_Details:req.body.Admission_Details,
        Discharge_Date:req.body.Discharge_Date,
        Patient_Status:req.body.Patient_Status
    })
    person.save().then(result =>{
        console.log(result)
        res.status(201).json({
            message: 'Handling POST requests of to patient details',
            createdProfile: result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    
})

router.post('/basicdetails', passport.authenticate('jwt', {session:false}), (req, res, next)=>
{
    const details = new basicDetails({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        Total_Patients: req.body.Total_Patients,
        Totel_Beds: req.body.Totel_Beds,
        Occupied_Beds: req.body.Occupied_Beds,
        Empty_Beds:req.body.Empty_Beds,
        Oxygen_Availability: req.body.Oxygen_Availability,
        Medicine_Status: req.body.Medicine_Status
    })
    details.save().then(result =>{
        console.log(result)
        res.status(201).json({
            message: 'Handling POST requests of to patient details',
            createdProfile: result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    
})

router.get('/basicdetails', passport.authenticate('jwt', {session:false}),(req, res, next)=>
{
    Profile.find()
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            stats: docs.map(doc =>{
                return {
                    _id:doc.id,
                    username:doc.username,
                    Total_Patients: doc.Total_Patients,
                    Totel_Beds: doc.Totel_Beds,
                    Occupied_Beds: doc.body.Occupied_Beds,
                    Empty_Beds:doc.Empty_Beds,
                    Oxygen_Availability: doc.Oxygen_Availability,
                    Medicine_Status: doc.Medicine_Status,
                    request: {
                        type: "GET",
                        url: "https://covid-dash-combined.herokuapp.com/hospital/stats/basicdetails/" + doc._id
                      }
                }
            })
        }
        console.log(docs)
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

/*
    
router.get('/:statsId', passport.authenticate('jwt', {session:false}), (req, res, next)=>
{
    const id = req.params.statsId;
    Profile.findById(id)
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            product: doc
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });

/*
router.patch('/:personId', (err,req,res,next)=>{
    const id = req.params.statsId
    const updateOps ={}
    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value
    }
    Stats.update({ _id:id}, { $set : updateOps})
    .exec()
    .then( result=> {
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })  
})

router.delete('/:personId', (req,res,next)=>{
    const id=req.params.personId
    Profile.findByIdAndDelete({ _id:id})
    .exec()
    .then( result => {
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })    
})
*/

module.exports = router;