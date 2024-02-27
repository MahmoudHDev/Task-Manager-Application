import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
// import LocalStrategy from 'passport-local'
import session from 'express-session';
import 'dotenv/config';
import { compareSync } from 'bcrypt';
const app = express();
const port = 9000;
const saltRounds = 10;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// 1- Manage Session middle-ware   "express-session "
app.set('trust proxy', 1)
app.use(session({
    secret: process.env.PASSPORT_SEC,
    resave: false,
    saveUninitialized: false,
}));

// 2- init passport & use session
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://127.0.0.1:27017/UserTasks');
// DB  
// 3- Schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});

// 2- Any Plugins to add
UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

// 3- Model
const User = mongoose.model('User', UserSchema);

// Strategy
// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// API
app.get('/', (req, res) => {
    res.send("Hello Wolrd!")
});

app.post('/login', (req, res) => {

    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    req.login(user,(err)=> { 
        if (err) { 
            console.log(err)
        }else{
            passport.authenticate("local", function (err, user, info) {
                // handle succes or failure
                if (err) {
                    console.log(err)
                } else {
                    console.log('redirect user to home ')
                    console.log("Cookies created")
                    console.log(user)
                }
            })(req, res)
        }
    })

})

//             Logout
app.get('/logout', (req, res) => {
    // Handle the logout
    req.logOut()
})

//              Register Routes 
app.post('/register', async (req, res) => {

    const { username, password } = req.body
    console.log(username, password)

    User.register({ username: username }, password, function (err, user) {
        if (err) {
            console.log(err)
            res.send("Send Back to register")
        } else {
            // Auth User
            console.log("Create Cookies")
            passport.authenticate("local", function (err, user, info) {
                // handle succes or failure
                if (err) {
                    console.log(err)
                } else {
                    console.log('redirect user to home ')
                    console.log("Cookies created")
                    console.log(user)
                }
            })(req, res)
        }
    })
});

//              Home
app.get('/home', async (req, res) => {

    if (req.isAuthenticated()) {
        res.send("Successfully authenticated");
    } else {
        res.send("Error in authentication");
    };
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

// PORT || 9000
app.listen(port, () => {
    console.log("App Started listening")
});