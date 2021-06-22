  
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../../passportpublic');
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
            username: req.body.username,
            First_Name: req.body.First_Name,
            Last_name: req.body.Last_name,
            Mobile_No: req.body.Mobile_No,              
            email: req.body.email,
            password: req.body.password,
            Address:req.body.Address,
            City:req.body.City,
            State:req.body.State,
            Zip:req.body.Zip
          });
          user
            .save()
            .then(result => {
              console.log(result);
              res.status(201).json(result);
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

      

router.post('/login', passport.authenticate('local',{session: false}), (req, res) => {
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