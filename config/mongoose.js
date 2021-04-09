//require the library
const mongoose = require('mongoose');

//Connect to the DB
// mongoose.connect('mongodb://localhost/blog');

mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true,  useUnifiedTopology: true , useCreateIndex:true});

//acquire the connection 
var db = mongoose.connection;

//error checking 
db.on('error', console.error.bind(console, 'Error connecting to the DB bro'));

//test successfull connection 
db.once('open', function() {
  // we're connected!
  console.log('Oh Yeah successfully connected to the DB!!');
});