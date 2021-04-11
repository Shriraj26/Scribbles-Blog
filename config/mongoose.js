//require the library
const mongoose = require("mongoose");

//Connect to the DB
// mongoose.connect('mongodb://localhost/blog');

const uri =
  "mongodb+srv://NotesUser:Notes123@cluster0.9ogkm.mongodb.net/blogDB?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//acquire the connection
var db = mongoose.connection;

//error checking
db.on("error", console.error.bind(console, "Error connecting to the DB bro"));

//test successfull connection
db.once("open", function () {
  // we're connected!
  console.log("Oh Yeah successfully connected to the DB!!");
});
