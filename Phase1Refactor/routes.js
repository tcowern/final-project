var Bucket= require('./controllers/buckets'),
Auth = require('./controllers/auth'),
Task = require('./controllers/task'),
express = require('express');


module.exports = (app) =>{

    app.get('/', Auth.middlewares.session);

    app.get('/', (req, res)=>{
        res.sendFile('index.html', {root : './public/html'})
    });
    
    // app.get('/', Auth.middlewares.session);

    app.get('/prioritize', (req, res)=>{
        res.sendFile('prioritize.html', {root : './public/html'})
    });

    app.get('/datebuckets', (req, res)=>{
        res.sendFile('datebuckets.html', {root : './public/html'})
    });

    app.get('/addtasks', (req, res)=>{
        res.sendFile('addtasks.html', {root : './public/html'})
    });

     app.get('/bucketlist', (req, res)=>{
        res.sendFile('bucketlist.html', {root : './public/html'})
    });


    app.all('/api*', Auth.middlewares.session);
   
    app.get('/logout', Auth.logout);
    app.post('/login', Auth.login);

    app.post('/register', Auth.register);



    app.get('/api/userId', Bucket.getUserID);

    
    app.put('/api/bucketcomp', Bucket.bucketComp);
    app.put('/api/taskcomp', Task.taskComp);
    app.put('/api/bucketedit', Bucket.put);
    app.put('/api/bucketgroup', Bucket.bucketGroup);

    app.get('/api/buckets', Bucket.get);
    app.get('/api/buckets/:id', Bucket.get);
    app.post('/api/buckets', Bucket.addBucket);
    app.post('/api/task', Task.addTask);
    app.get('/api/task', Task.getAll);
    app.get('/api/task', Task.get);
    app.get('/api/task/:id', Task.get);
    
    
    
    //     app.get('/', (req, res)=>{
    //     res.sendFile('index.html', {root : './public/html'})
    // });
    // app.use(express.static('public'));
    


}