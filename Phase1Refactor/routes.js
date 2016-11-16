var Bucket= require('./controllers/buckets'),
Auth = require('./controllers/auth'),
express = require('express');


module.exports = (app) =>{

    app.get('/', Auth.middlewares.session);
    
    app.get('/', (req, res)=>{
        res.sendFile('index.html', {root : './public/html'})
    });

    app.all('/api*', Auth.middlewares.session);
   
    app.get('/logout', Auth.logout);
    app.post('/login', Auth.login);

    app.post('/register', Auth.register);

    

    app.get('/api/userId', Bucket.getUserID);

    
    
    // app.post('/api/buckets', Bucket.create);
    app.get('/api/buckets', Bucket.get);
    app.get('/api/buckets/:id', Bucket.get);
    app.post('/api/buckets', Bucket.addBucket);
    
    
    //     app.get('/', (req, res)=>{
    //     res.sendFile('index.html', {root : './public/html'})
    // });
    // app.use(express.static('public'));
    


}