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

//Getting Models from the schema.js 
const Schema = require('./schema.js');

const CompanyModel = Schema.CompanyModel;
const QuestionModel = Schema.QuestionModel;


//Delete Companies from the data base so we can restart 
CompanyModel.remove({}, (err) => {
console.log(err);
});

//Create Information For Companies and Questions
const facebook = new CompanyModel({ name: 'FaceBook', state: 'California' })
const goole = new CompanyModel({ name: 'Google', country: 'US' })
const ktwo = new CompanyModel({ name: 'K2', country: 'Canada' })