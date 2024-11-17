const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({});

const mongoURI = process.env.DATABASE;

const connectToMongo = () => {
    mongoose.connect(mongoURI).then(()=>{
        console.log('connected to database');
    })
}

module.exports = connectToMongo