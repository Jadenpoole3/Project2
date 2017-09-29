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
const google = new CompanyModel({ name: 'Google', state: 'California' })
const cnn = new CompanyModel({ name: 'CNN', state: 'Georgia' })
const abc = new CompanyModel({ name: 'ABC', state: 'New York' })

const tellQuestion = new QuestionModel({questions: 'Tell me about yourself', answer: 'I am currently working as an mobile sales representative, where I activated phones and put customers on carrier plans.And while I really enjoyed the work that I did, I’d love the chance to dig in much deeper with one specific Web Developement company'})
const whyQuestion = new QuestionModel({questions:'Why do you want to work here', answer: 'I really believe in the value of teamwork and so when I saw a position with your company to join your engineering department I had to make sure my application was put in.  I believe strongly in working with other people towards a common goal'})
const whereQuestion = new QuestionModel({questions:'Where do you see yourself in five years', answer: 'My goal right now is to find a position at a company where I can grow and take on new challenges over time. Ultimately, I’d like to assume more management responsibilities and get involved in product strategy.'})

//Here assign some question 
const companies =[google,cnn,abc]
const questions = [tellQuestion,whyQuestion,whereQuestion]

companies.forEach((company, i) => {
    
        company.questions.push(questions[i])
    
        company.save()
            .then((company) => {
                console.log(`${company.name} saved!`)
            })
            .catch((error) => {
                console.log(error)
            })
    });
    
    // Disconnect from database
    db.close();