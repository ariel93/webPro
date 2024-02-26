//server
const express = require("express");
const app = express();
const path = require("path");
const PORT = 4000;
const mongoose = require("mongoose");
const { log } = require("console");
const { equal } = require("assert");
// npm init -y 
// npm i express mongoose
// if not work --> sudo npm i express mongoose
// nodemon server.js


// mongoose.connect('mongodb+srv://dnahshonov:sk859vlbro@cluster0.txy3eu1.mongodb.net/rehovot12')
// .then(()=>{
//     console.log("DB is live");
// })
// .catch((err)=>{
//     console.log("DB conection trouble:" + err);
// })
//!
const loggerMiddleware = (req,res,next)=>{
    const now = new Date()
    const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    console.log(`Date: ${date} ${time}\nRequest: ${req.method}\nPath: ${req.path}`);
    next()
    
}
app.use(express.json()); 
app.use(express.static("client"));
app.use(loggerMiddleware)


app.listen(PORT, () => {
    console.log(`server is on: http://localhost:${PORT}`);
  });