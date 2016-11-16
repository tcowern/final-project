var mongoose = require('mongoose');

taskSchema = new mongoose.Schema({
    bucketid: {type: mongoose.Schema.ObjectId, ref: "Bucket"},
    taskname: String,
    taskdate : {type : String, default: ""},
    tasks : {type : Array, default : []},
    taskcomp : {type : Boolean, default : false},
    taskcompdate: {type: String, default: ""}
});

module.exports = mongoose.model('Task', taskSchema);

// db will be tasks