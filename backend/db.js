const mongoose = require('mongoose');

const url = "mongodb://Dineshkumar:Dinesh97@cluster0-shard-00-00.den4s.mongodb.net:27017,cluster0-shard-00-01.den4s.mongodb.net:27017,cluster0-shard-00-02.den4s.mongodb.net:27017/stackoverflow?ssl=true&replicaSet=atlas-xqxn2s-shard-0&authSource=admin&retryWrites=true&w=majority"

module.exports.connect = () => {
    mongoose.connect(url).then((res) => 
    console.log("MongoDB is connected successfully")).catch((err) => console.log("Error: ", err));
};