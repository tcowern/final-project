var Task = require('../models/tasksModel');// db.tasks

function addTask (req, res) {
    
    console.log("addTask: ", req.body);
    // var user = req.session.userId;
    var bucket = "";
    console.log("bucketname: ",req.body);
    // console.log("user: ", user);
    var bvar = req.body;
    // bvar.userid = user;
    
   
    console.log("Edit Task: ", bvar);
    var newTask = new Task(req.body);
    console.log("newTask: ",newTask);
    newTask.save((err, doc)=>{
        if(err){
            return res.send(err);
        }
            res.send(doc);
            // res.redirect('/index');
            console.log(doc);
    });

}

function getAll (req, res) {

    console.log("getAll req.body",req.body);
        Task.find({}, (err, document)=>{
            // res.send(err || documents)
            if(err){
                res.send(err);
            } else {
            console.log("getAll DOCUMENT",document);
            res.send(document);
            }
        });
}

function get (req, res) {

      console.log("req.body",req.body);
        Task.find({bucketid : req.params.id}, (err, document)=>{
            // res.send(err || documents)
            if(err){
                res.send(err);
            } else {
            console.log("DOCUMENT",document);
            res.send(document);
            }
        });
    
}

function taskComp (req, res) {
    console.log("taskcomp req.body",req.body);
        Task.findByIdAndUpdate(req.body.taskid, {taskcomp: req.body.taskcomp}, {new: true}, (err, document)=>{
            // res.send(err || documents)
            if(err){
                res.send(err);
            } else {
            console.log("DOCUMENT from taskcomp",document);
            res.send(document);
            }
    });

}

module.exports = {
    addTask : addTask,
    get    : get,
    getAll : getAll,
    taskComp : taskComp 
}