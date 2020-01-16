const mongoose = require('mongoose');

const DB_URI = 'mongodb://admin:Dp9KNJLuCNGTcoKV@cluster0-shard-00-00-uavp4.mongodb.net:27017,cluster0-shard-00-01-uavp4.mongodb.net:27017,cluster0-shard-00-02-uavp4.mongodb.net:27017/local_library?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

module.exports.connect = function connect() {
    return new Promise((resolve, reject) => {

        mongoose.connect(DB_URI, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            })
            .then((res, err) => {
                if (err) return reject(err);
                resolve();
            })



    });
}




module.exports.close = function close() {
    return mongoose.disconnect();
}