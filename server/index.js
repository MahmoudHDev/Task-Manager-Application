import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';
import passportLocalMongoose from 'passport-local-mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import connectEnsureLogin from 'connect-ensure-login';
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
app.use(session({
    secret: process.env.PASSPORT_SEC,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use(session());
app.use(passport.session());
// DB  
// 1- Schema
const UserSchema = new mongoose.Schema({
    username: String,
    fName: String,
    lName: String,
    password: String
});
// 2- Any Plugins
UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);
// 3- Model
const User = mongoose.model('User', UserSchema);

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOrCreate({ username: username }, function (err, user, created) {
            // created will be false here
            console.log(user);
            if (err) {
                console.log('error ' + err);
            } else {
                console.log('successfully done');
            }
        })
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

//              Login Routes 
app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        console.log(req.body)
        console.log("Successfully logged")
        res.redirect('/');
    });
//             Logout
app.get('/logout', (req, res) => {
    // Handle the logout
})

//              Register Routes 
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
        User.register({
            username: req.body.email,
            fName: req.body.fName,
            lName: req.body.lName,
        }, hashedPassword, (err, user) => {
            if (err) {
                console.log(err)
                res.send({ success: false, errorMessage: err })
            } else {
                console.log("successfully registered" + user)
                res.send({ success: true })
            }
        })
    } catch (error) {
        console.log("Error has been occured when hashin password")
    }
});

app.get('/register', (req, res) => {
    res.send("Hellllooo REg");
});

//              Home
app.get('/home', async (req, res) => {

    res.send("Hello World from server");
})


// 
app.listen(port, () => {
    console.log("App Started listening")
});
// const user = User.findOne({ username: username });
// if (!user) { return done(null, false); }
// if (user.password != password) {
//     return done(null, false);
// } else {
//     return done(null, user);
// }

// passport.authenticate('local', (req, res, () => {
//     console.log("Redirect to the home or profile page")
//     res.send({ success: true })
// }))

