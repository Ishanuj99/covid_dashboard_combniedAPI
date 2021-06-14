const express= require('express')
const router = express.Router()
const mongoose=require('mongoose')
const stats = require('../../models/government/stats')
const passport = require('passport');
require('../../passportpublic')
const Profile = require("../../models/government/stats")

router.get('/', passport.authenticate('jwt', {session:false}),(req, res, next)=>
{
    Profile.find()
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            stats: docs.map(doc =>{
                return {
                    _id:doc.id,
                    State:doc.State,
                    Population: doc.Population,
                    Confirmed:doc.Confirmed,
                    Recovered:doc.Recovered,
                    Deaths: doc.Deaths,
                    Active: doc.Active,
                    Tested: doc.Tested,
                    Last_Updated_Time:doc.Last_Updated_Time,
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
router.post('/', passport.authenticate('jwt', {session:false}), (req, res, next)=>
{
    const person = new Profile({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age:req.body.age
    })
    person.save().then(result =>{
        console.log(result)
        res.status(201).json({
            message: 'Handling POST requests to /Govt dashboard',
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