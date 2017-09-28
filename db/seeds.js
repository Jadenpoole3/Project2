require('dotenv').config();

//Setting Up My Database 
//requiring mongoosse
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection;

//Shows error if it can not connect to Mongoose 
db.on('error', (err) => {
console.log(err);
});

//Shows it was connected to Mongoose 
db.once('open', () => {
    console.log("Connected to MongoDb");
});