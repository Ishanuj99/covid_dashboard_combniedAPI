const express= require('express')
const router = express.Router()
const mongoose=require('mongoose')
const stats = require('../../models/public/stats')
const passport = require('passport');
require('../../passportpublic')

const Profile = require("../../models/public/stats")
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
                    Country:doc.Country,
                    State: doc.State,
                    District:doc.District,
                    Recovered:doc.Recovered,
                    Area: doc.Area,
                    Landmark: doc.Landmark,
                    request: {
                        type: "GET",
                        url: "https://public12.herokuapp.com/stats/" + doc._id
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