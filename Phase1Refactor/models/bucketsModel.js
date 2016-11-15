var mongoose = require('mongoose'),
bcrypt = require('bcryptjs'),
    SALT_INDEX = 10;    // the larger this value is, the stronger the encryption,
                        // but the longer it will take to compare hashes

var bucketSchema = mongoose.Schema({
    username: {type: String,unique: true},
    email: {type: String,unique: true},
    firstname: String,
    lastname: String,
    birthdate: String,
    sex: String,
    password: String,
    date : {type : String, default : '01/01/2017'},
    buckets : {type : Array, default : []},
    completed : {type : Boolean, default : false},
    created: {type: Number,default: () => Date.now()}
});

bucketSchema.pre('save', function(next) {
    var user = this; // new User(req.body);

    // user.email = user.email.toLowerCase();

    // only hash the password if modified or a new user
    if( !user.isModified('password') ) {
        return next();
    }

    // generate a salt value to encrypt our password
    bcrypt.genSalt(SALT_INDEX, (saltErr, salt) =>{
        if( saltErr ) {
            console.error(saltErr);
            return next(saltErr);
        }
        console.info('SALT GENERATED', salt);

        // hashing this bad boy!
        bcrypt.hash(user.password, salt, (hashErr, hashedPassword) => {
            if( hashErr ) {
                console.error(hashErr);
                return next(hashErr);
            }
            // override the plain text password with the hashed one.
            user.password = hashedPassword;
            next();
        });
    });
});

module.exports = mongoose.model('Bucket', bucketSchema);

// db will be buckets