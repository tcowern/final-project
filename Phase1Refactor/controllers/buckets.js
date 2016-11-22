var Bucket = require('../models/bucketsModel');
// Task = require('../models/tasksModel');// db.buckets

function put (req, res) {
    console.log("req.body",req.body);
        Bucket.findByIdAndUpdate(req.body.bucketid, {bucketdate: req.body.bucketdate}, {new: true}, (err, document)=>{
            // res.send(err || documents)
            if(err){
                res.send(err);
            } else {
            console.log("DOCUMENT from PUT",document);
            res.send(document);
            }
    });

}

function bucketComp (req, res) {
    console.log("bucketcomp req.body",req.body);
        Bucket.findByIdAndUpdate(req.body.bucketid, {bucketcomp: req.body.bucketcomp}, {new: true}, (err, document)=>{
            // res.send(err || documents)
            if(err){
                res.send(err);
            } else {
            console.log("DOCUMENT from bucketcomp",document);
            res.send(document);
            }
    });

}

function bucketGroup (req, res) {
    console.log("bucketgroup req.body",req.body);
        Bucket.findByIdAndUpdate(req.body.bucketid, {topgroup: req.body.topgroup}, {new: true}, (err, document)=>{
            // res.send(err || documents)
            if(err){
                res.send(err);
            } else {
            console.log("DOCUMENT from bucketgroup",document);
            res.send(document);
            }
    });

}

function get (req, res) {
    // get One
    if(req.params.id){
        Bucket.findOne({_id : req.params.id}, (err, document)=>{
            if(err){
                // if(err.name === "CastError" && err.kind === "ObjectId"){
                //     return res.send(`That ain't no ID`)
                // }
               
                return res.send(err);
            }
            if(!document){
                return res.send('No one with that id')
            }
            // console.log("Get Doc: ", document);
            res.send(document);
        });
    }
    // get Many
    else{
        Bucket.find({userid: req.session.userId}, (err, document)=>{
            // res.send(err || documents)
            if(err){
                return res.send(err);
            }
            res.send(document);
        });
    }
}

function addBucket (req, res) {
    
    // console.log("addBucket", req.body);
    var user = req.session.userId;
    console.log("user: ", user);
    var bvar = req.body;
    bvar.userid = user;
    
   
    console.log("Edit Input haha: ", bvar);
    var newBucket = new Bucket(req.body);
    console.log("newBucket: ",newBucket);
    newBucket.save((err, doc)=>{
        if(err){
            return res.send(err);
        }
            res.send(doc);
            // res.redirect('/index');
            console.log(doc);
    });

}

function getUserID(req, res) {
    console.log("req sess: ",req.session);
    return res.send(req.session.userId);
}



module.exports = {
    put : put,
    get    : get,
    addBucket    : addBucket,
    getUserID : getUserID,
    bucketComp : bucketComp,
    bucketGroup : bucketGroup
}

// module.exports = {
//     create : (req, res) =>{

//     },
// }