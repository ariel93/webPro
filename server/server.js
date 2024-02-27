require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');

const LoggeeMiddleware = require('./middlewares/logger');
const userRoutes = require('./src/user/userRoutes');

const app = express();

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.deazlca.mongodb.net/`)
.then(()=>{
    console.log("DB is live");
})
.catch((err)=>{
    console.log("DB conection trouble:" + err);
})

app.use(cors())
app.use(express.json()); 
app.use(express.static("client"));
app.use(LoggeeMiddleware);

// Use user routes
app.use('/users', userRoutes);

app.listen(process.env.APP_PORT, () => {
    console.log(`server is on: http://localhost:${process.env.APP_PORT}`);
});