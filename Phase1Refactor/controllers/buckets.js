var Bucket = require('../models/bucketsModel'); // db.buckets

function create (req, res) {

    // var newDoc = new Bucket(req.body);
    console.log(req.body);
    Bucket.save((err, doc)=>{
        if(err){
            return res.send(err);
        }
        res.redirect('/index');
        console.log(doc);
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
            res.send(document);
        });
    }
    // get Many
    else{
        Bucket.find({}, (err, documents)=>{
            // res.send(err || documents)
            if(err){
                return res.send(err);
            }
            res.send(documents);
        });
    }
}

function addBucket (req, res) {
    
    console.log(req.body);
    var user = req.session.userId;
    console.log("user: ", user);
    var bvar = req.body.buckets;
    // var tasks = req.body.buckets[tasks];
    // console.log("tasks", tasks);
        // 'description': req.body.description,
    
    // var newBarrel = new barrel(aryansvar);
    console.log("Edit Input haha: ", bvar);
    Bucket.findOneAndUpdate({'_id': user}, {$push:{buckets:{"bucket" :bvar, "compb":"", "completed":false, "tasks":[{"name":"task 1", "comptd":"", "compt": false}, {"name":"task 2", "comptd":"", "compt": false}]}}}, {new: true}, (err, doc) => {
        if (err) {
            return res.send(err);
        }
        console.log(doc.buckets[3].tasks);
        res.send(doc);
    });

    // Bucket.findOneAndUpdate({'_id': user}, {$push:{buckets:{"bucket" :bvar, "compb":"", "completed":false, "tasks":[{"name":"task 1", "comptd":"", "compt": false}, {"name":"task 2", "comptd":"", "compt": false}]}}}, {new: true}, (err, doc) => {
    //     if (err) {
    //         return res.send(err);
    //     }
    //     console.log(doc.buckets[3].tasks);
    //     res.send(doc);
    // });


}

module.exports = {
    create : create,
    get    : get,
    addBucket    : addBucket
}

// module.exports = {
//     create : (req, res) =>{

//     },
// }