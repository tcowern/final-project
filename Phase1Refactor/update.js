var express = require('express');
var Todo = require('../models/todo');


var router = express.Router();

router.get('/todos', function(req, res) {
    Todo.find({}, function(err, todos) {
        if (err) {
            res.status(500).json({
                message: err.message
            });
        }
        res.json({
            todos: todos
        });
    });
});

router.post('/todos', function(req, res) {
    var todo = req.body;
    Todo.create(todo, function(err, todo) {
        if (err) {
            return res.status(500).json({
                err: err.message
            });
        }
        res.json({
            'todo': todo,
            message: 'Todo Created'
        });
    });

});
router.put('/todos/:id', function(req, res) {
    var id = req.params.id;
    var todo = req.body;
    if (todo && todo._id !== id) {
        return res.status(500).json({
            err: "Ids don't match"
        });
    }
    Todo.findByIdAndUpdate(id, todo, {
        new: true
    }, function(err, todo) {
        if (err) {
            return res.status(500).json({
                err: err.message
            });
        }
        res.json({
            'todo': todo,
            message: 'Todo Updated'
        });
    });

});

router.delete('/todos/:id', function(req, res) {
    var id = req.params.id;
    Todo.findByIdAndRemove(id, function(err, result) {
        if (err) {
            return res.status(500).json({
                err: err.message
            });
        }
        res.json({
            message: 'Todo Deleted'
        });
    });
});

module.exports = router;