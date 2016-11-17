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

function get (req, res) {
    // get One
    // if(!req.params.id){
    //     Task.find({bucketid : req.params.id}, (err, document)=>{
    //         if(err){
    //             console.log("req params id", req.params.id);
    //             if(err.name === "CastError" && err.kind === "ObjectId"){
    //                  res.send(`That ain't no ID`)
    //             }
               
    //             res.send(err);
    //         }
    //         if(!document){
    //             res.send('No one with that task id')
    //         }
    //         console.log("bucket id; ", req.params.bucketid)
    //         // console.log("document: ", document);
    //         res.send(document);
    //     });
    // }
    // // get Many
    // else{
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
    // }
}

module.exports = {
    addTask : addTask,
    get    : get,
    // addBucket    : addBucket,
    // getUserID : getUserID
}