// we require the mongoose file
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo_development');

const db = mongoose.connection;

// check if it is error
db.on('error',console.error.bind(console,"error connecting to mongodb"));

// check if it successfull connect to database
db.once('open',function(){
    console.log('successfully connected to database');
})

// exports the module
module.exports = db;