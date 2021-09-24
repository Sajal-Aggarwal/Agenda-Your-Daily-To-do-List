// making the schema 
// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const mongoose= require('mongoose');

// making the schema using new keyword
const taskSchema= new mongoose.Schema({
    description: {
        type: String, 
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const Task= mongoose.model('Task', taskSchema);

// export the Task
module.exports = Task;