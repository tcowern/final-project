var User = require('../models/userModel'),
    bcrypt = require('bcryptjs');

module.exports = {
    login: ( req, res ) => { // POST login
        console.info('LOGIN::POST::PAYLOAD::', req.body);

        User.findOne({
            email: req.body.email
        }, (err, user) => {
            if( err ) { // this will trigger the error .then callback on the frontend
                console.error('MongoDB error:', err);
                res.status(500).json(err);
            }
            if( !user ) {
                console.warn('No user found!');
                res.status(403).json({ message: 'Invalid username or password' });
            } else {
                console.info('auth.login', user);

                bcrypt.compare(req.body.password, user.password, (compareErr, matched) => {
                    if( compareErr ) { // this will trigger the error .then callback on the frontend
                        console.error('compareErr error:', compareErr);
                        res.status(500).json(err);
                    } else if( !matched ) {
                        console.warn('Password mismatch!');
                        res.status(403).json({ message: 'Invalid username or password' });
                    } else {
                        req.session.userId = user._id;
                        // res.redirect('html/index.html');
                        res.send({ message: 'Login success!', userId : req.session.userId });
                        
                    }
                })
            }

        })
    },
    logout: (req, res ) => {
        req.session.destroy();
        res.redirect('/html/login.html');
    },
    register: ( req, res ) => {
        console.log("You hit registration");
        //console.log(req.body);


        var newUser = new User(req.body);

        // when this function fires, it is going to hit the pre save middleware
            newUser.save((err, user)=>{
            if(err){
                return res.send(err);
            }
            // req.session.userId = user._id;
            // res.redirect('/html/index.html');

             req.session.uid = user._id; // set the user in the session!
                res.send("Successfully registered!"); // send a success message
        });
    },
    middlewares: {
        session: (req, res, next) => { // this will be the middleware that checks for a loggedin user
            console.log("Inside session");
            if( req.session.userId ) {
                // res.redirect('/html/index.html');
                next();
            } else {
                // res.redirect('Blue');
                res.redirect('/html/login.html');
                console.log("Should redirect to login")
            }
        }
    }


}