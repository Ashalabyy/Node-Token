const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const express = require('express');

const AuthRoutes = require('./Routes/Auth');

const PORT = process.env.PORT || 4000;
// Note this project didnt finish yet this is not the final result of it
// please Make Sure to change the link of the Db
const DB = 'mongodb+srv://ashalaby:<PASSWORD>@auth.ovwv1wk.mongodb.net/Auth?retryWrites=true&w=majority';
const app = express(); 
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(AuthRoutes);



app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type, Authorization');
    next();
});

mongoose.set("strictQuery", false);
mongoose.connect(DB).then(client =>{

    app.listen(PORT)
    console.log(`Connected to Mongoose  ${PORT}`);
}).catch(err=>{
    console.log(err);
});