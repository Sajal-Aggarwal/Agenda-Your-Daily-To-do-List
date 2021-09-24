// require the libraray
const mongoose= require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost/todo_list_db');

// Acquire the connection to check if it's succesful
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'Error connecting to the database'));

// up and running then print the message
db.once('open', function() {
   console.log('Successfully connected to the database!!!');
  });