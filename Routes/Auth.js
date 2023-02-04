const UserController = require('../controllers/Auth');
const { body }  = require('express-validator');
const User = require('../Models/Users');
const express = require('express');
const { Router } = require('express');

const route = express.Router();
// Note this project didnt finish yet this is not the final result of it
route.put('/SignUp',[
    body('email')
    .isEmail()
  
    .custom((value, { req })=>{
        return User.findOne({email : value}).then(usr =>{
            if(usr){
                return Promise.reject('E-mail already exist')
            }
        });
    })
    .normalizeEmail(),
        
    
    ],UserController.SignUp);

route.post('/login',UserController.login); 
route.delete('/logout',UserController.signOut);   
module.exports = route;