const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
const ticketsRouter = require('./routes/api/v1/tickets');

const app = express();

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cors()); // Enable All CORS Requests
app.use(express.urlencoded({ extended: true }));

//
// Mount ticketsRouter to: /api/v1/tickets
//
app.use('/api/v1/tickets',ticketsRouter);


//
// Declare store credentials. You will use your database id and password as you
// work on this project. Use process.env.USER and process.env.PASS
const dbuser = process.env.USER;
const dbpass = process.env.PASS;
 
//
// Declare mongoDB variable to the URI for your own database as you work on this
// project. Make the URI an empty string when you submit.
// brhn19 - 1234

const mongoUri = '';
//`mongodb+srv://${dbuser}:${dbpass}@nguyen-cmsc389np2.euovt.mongodb.net/Project2?retryWrites=true&w=majority`;
               
 //`mongodb+srv://${dbuser}:${dbpass}@cluster0.r77gg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`;
console.log(mongoUri);
console.log(process.env.USER + " " + process.env.PASS);

//
// connect to the mongo database using mongoUri
//



mongoose.connect(mongoUri)
  .then(() => {
    console.log('db connection was successful')
    // populate();
    //app.get('/', function (req, res) {
    //  res.send('hello world')
    //})
  })
  .catch(e => console.error('db connection failed'));

module.exports = app;
