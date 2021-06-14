  
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../../passport');
const JWT = require('jsonwebtoken');
const User = require("../../models/public/user");

const signToken = userID => {
  return JWT.sign({
      iss: "NoobCoder",
      sub: userID
  }, "NoobCoder", {expiresIn: "1h"});
}

router.post('/signup', (req, res) => {
  const {username, password} = req.body;
  User.findOne({username}, (err, user) => {
      if(err) {
        console.log(err)
          res.status(500).json({message: {msgBody: "Error has occured", msgError: true}})
      }
      if(user) {
          res.status(400).json({message: {msgBody: "Username is already taken", msgError: true}})
      }
      else {
          const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username:req.body.username,
              //Hospital_id:req.body.Hospital_id,
              Hospital_Name:req.body.Hospital_Name,
              password:req.body.password,
              Contact_Number:req.body.Contact_Number,
              License_Number:req.body.License_Number,
              Registration_Number:req.body.Registration_Number,
              Hospital_Type:req.body.Hospital_Type,
              Address:req.body.Address,
              City:req.body.City,
              State:req.body.State,
              Pincode:req.body.Pincode
          });
          user
            .save()
            .then(result => {
              console.log(result);
              res.status(201).json({
                message: "User created"
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
            });
        }
      });
    })

      

router.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
  if(req.isAuthenticated()) {
      const {_id, username} = req.user;
      const token = signToken(_id);
      res.cookie('access_token', token, {httpOnly: true, sameSite: true});
      res.status(200).json({isAuthenticated: true, user: {username}})
  }
});

router.get('/logout', passport.authenticate('jwt', {session:false}), (req, res) => {
  res.clearCookie('access_token');
  res.json({user: {username: ''}, success: true});
});


router.delete("/:userId", (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;