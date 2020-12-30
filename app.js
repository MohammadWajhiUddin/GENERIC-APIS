require("dotenv").config();
//defining express services

const express = require('express');
const app = express();

//utilizing all the routers which we have define inside user_detailed_working router.js file,

const UserRouter = require('./api/user_add_deleted_update_find_apis/user_detailed_working.router')


app.use(express.json());


//defining headers parameters this
//these parameters will be used for APIS HEADERS RESPONSE, IF WE ARE SENDING TOKEN VIA HEADERS THEN these will be utilized
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type,Accept,Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
})


//over here we will define the base route for every ENDPOINTS
//IN This example we have genricapis for user routes

app.use("/genericapis",UserRouter);






app.listen(process.env.port,()=>{
    console.log("server up and running on port ", process.env.port)
})