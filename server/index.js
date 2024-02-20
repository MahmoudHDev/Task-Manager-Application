import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';


const app = express();
const port = 9000;
mongoose.connect('mongodb://127.0.0.1:27017/UserTasks');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send("Hello Wolrd!")
});


app.get('/login', (req, res) => {
    res.send("Hello Wolrd!")
});

app.get('/signup', (req, res) => {
    res.send("Hello Wolrd!")
});

app.listen(port, () => {
    console.log("App Started listening")
});
