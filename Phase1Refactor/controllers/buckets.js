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

module.exports = {
    create : create,
    get    : get
}

// module.exports = {
//     create : (req, res) =>{

//     },
// }