var mongoose = require('mongoose');

 bucketSchema = new mongoose.Schema({
    userid: {type: mongoose.Schema.ObjectId, ref: "User"},
    bucketname:{type : String, default: ""},
    bucketdate : {type : String, default: "01/01/2017"},
    buckets : {type : Array, default : []},
    bucketcomp : {type : Boolean, default : false},
    bucketcompdate: {type: String, default: ""},
    topgroup: {type: Boolean, default: false}

});

module.exports = mongoose.model('Bucket', bucketSchema);

// db will be buckets