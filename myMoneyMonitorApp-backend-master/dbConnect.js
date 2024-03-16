require('dotenv').config();
const mongoose  = require("mongoose");

const uri = process.env.MONGO_URI

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})

const connection = mongoose.connection

connection.on('error',err=>console.log(err));

connection.on('connect',()=>console.log("DB connection established..."))