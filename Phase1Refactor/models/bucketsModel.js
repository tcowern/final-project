var mongoose = require('mongoose');

 bucketSchema = new mongoose.Schema({
    userid: {type: mongoose.Schema.ObjectId, ref: "User"},
    bucketname:{type : String, default: ""},
    bucketdate : {type : String, default: ""},
    buckets : {type : Array, default : []},
    bucketcomp : {type : Boolean, default : false},
    bucketcompdate: {type: String, default: ""},

});

module.exports = mongoose.model('Bucket', bucketSchema);

// db will be buckets