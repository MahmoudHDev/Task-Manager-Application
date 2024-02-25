import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';
import passportLocalMongoose from 'passport-local-mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import 'dotenv/config';
import bcrypt from 'bcrypt';

const app = express();
const port = 9000;
const saltRounds = 10;


mongoose.connect('mongodb://127.0.0.1:27017/UserTasks');

app.set('trust proxy', 1)
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Manage Session middle-ware
app.use(session({
    secret: process.env.PASSPORT_SEC,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
// DB  
// 1- Schema
const UserSchema = new mongoose.Schema({
    username: String,
    fName: String,
    lName: String,
    password: String
});

// 2- Any Plugins to add
UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

// 3- Model
const User = mongoose.model('User', UserSchema);

passport.use(new LocalStrategy(
    async function (username, password, done) {
        await User.findOrCreate({ username: username }, function (err, user) {
            console.log(user);
            if (err) {
                console.log('error ' + err);
            }
            if (!user) {
                console.log('Incorrect username');
                return done(null, false, { message: 'Incorrect username.' });
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return done(err);
                }
                if (result) {
                    // Passwords match, authentication successful
                    return done(null, user);
                } else {
                    // Passwords do not match
                    return done(null, false, { message: 'Incorrect password.' });
                }
            });
        });
    }
));

// Serialize user into the session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

// API
app.get('/', (req, res) => {
    res.send("Hello Wolrd!")
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/home', // Redirect to dashboard on successful login
    failureRedirect: '/login', // Redirect back to login page on failure
    failureFlash: true // Enable flashing messages for failed login attempts (optional)
}));

//             Logout
app.get('/logout', (req, res) => {
    // Handle the logout
    req.logOut()
})

//              Register Routes 
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
        User.register({
            username: req.body.email,
            fName: req.body.fName,
            lName: req.body.lName,
            active: false
        }, hashedPassword, (err, user) => {
            if (err) {
                console.log(err)
                res.send({ success: false, errorMessage: err })
            }
            const authenticate = User.authenticate('local');

            authenticate('username', hashedPassword, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send({ success: true })
                    console.log("Redirect the use ")
                }

            })

        })
    } catch (error) {
        console.log("Error has been occured when hashin password")
    }
});

//              Home
app.get('/home', async (req, res) => {

    if (req.isAuthenticated()) {
        res.send("Successfully authenticated");
    } else {
        res.send("Error in authentication");
    };
});


// PORT || 9000
app.listen(port, () => {
    console.log("App Started listening")
});