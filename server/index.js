import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import axios from 'axios';

const app = express();
const port = 9000;
mongoose.connect('mongodb://127.0.0.1:27017/UserTasks');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hello Wolrd!")
});
//              Login Routes 

app.post('/login', async (req, res) => {
    console.log(req.body);
});

//              Register Routes 
app.post('/register', (req, res) => {
    console.log(req.body);
});
app.get('/register', (req, res) => {
    res.send("Hellllooo REg");
});




// 
app.listen(port, () => {
    console.log("App Started listening")
});
