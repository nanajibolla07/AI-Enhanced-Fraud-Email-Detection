const mongoose = require('mongoose');
const mongooseURI = "mongodb://localhost:27017/FraudMessageDetection";

const connectToMongo = () => {
    mongoose.connect(mongooseURI).then(()=>{
        console.log("Connected to mongo sucesfully");
    })
}

module.exports = connectToMongo