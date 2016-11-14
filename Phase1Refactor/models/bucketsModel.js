var mongoose = require('mongoose');

var bucketSchema = mongoose.Schema({
    name : {type : String, required : true},
    date : {type : String, default : '01/01/2017'},
    tasks : {type : Array, default : []},
    completed : {type : Boolean, default : false},
});

module.exports = mongoose.model('Bucket', bucketSchema);
// db will be buckets