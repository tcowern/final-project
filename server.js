var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Routes = require('./routes');

mongoose.connect('mongodb://localhost/heroes-of-ajax');

var PORT = process.env.PORT || 3000

var app = express();

// Middleware
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}), bodyParser.json());

// Routes
Routes(app);

app.listen(3000, ()=>{
    console.log('Server is running on: ', PORT);
});