const Users = require('../Models/Users');

const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
//Note please Make Sure that flutter Token project is Up and running 
// Note this project didnt finish yet this is not the final result of it
exports.SignUp = async (req,res,next) => {
    const erorrs =  validationResult(req);
    if(!erorrs.isEmpty()) {
        const erorr = new Error('User already exisit');
        erorr.statusCode = 422;
        throw erorr;
    }
    const FirstName = req.body.FirstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    try{
 
    
const hashedpassword = await bcrypt.hash(password, 5);
    
        const user = new Users({
            FirstName : FirstName,
            lastName : lastName,
            email : email, 
            password : hashedpassword,
        })
       const usr = await user.save();
   
        res.status(201).json({message : "Done"});
    }
    catch (err){
        console.log(err);
    }     
}
//Note please Make Sure that flutter Token project is Up and running 
// Note this project didnt finish yet this is not the final result of it
// am gonna send data with the token so i can excracted in my flutter app 
exports.login = (req,res,next) =>{
  console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    let loadeduser;
    Users.findOne({email: email}).then(usr =>{
        if(!usr){
         const error = new Error('A user with this email could not be found.');
         error.statusCode = 401;
         throw error;
        }
        loadeduser = usr;
       return bcrypt.compare(password , usr.password);
    }).then(isEqual =>{
        if(!isEqual){
    const error = new Error('Wrong password');
    error.statusCode = 401;
    throw error;
        }
    
    const token = jwt.sign({
        email: loadeduser.email,
        userId:loadeduser._id.toString()
    },'ashalabysecret',
    {expiresIn : '1h'},
    );
    res.status(200).json({token: token,userId : loadeduser._id.toString(),email : loadeduser.email,});
    }).catch(err =>{
        console.log(err);
    });

}

