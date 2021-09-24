//Express is a minimal and flexible Node.js web application framework that provides a 
//robust set of features for web and mobile applications. 
//It helps in fast-tracking development of server-based applications.
const express=require('express');

// Path is an inbuilt module in npm and need not be installed
const path=require('path');

// The port no. on which we see in the browser. In this case, it is localhost:8000
const port=8000;

// The bodyParser object exposes various factories to create middlewares as variable
var bodyParser = require('body-parser');

// require mongoose
const db= require('./config/mongoose');

// accesing the task through router
const Task=require('./models/task');

const app= express();

// Setting ejs as the view engine for the web app
app.set('view engine' ,'ejs');

/*The use of __dirname helps generalise the path so that it need not be altered by the user 
 when viewing the file on his system*/
app.set('views',path.join(__dirname,'views'));

// Middleware which encodes the url
app.use(express.urlencoded());

// Accessing the static files
app.use(express.static('assets'));

app.use(express.urlencoded({ extended: true }));

// Get the task through routing with get method (make a request and get response) and use controller for action
app.get('/', function(req,res){
    Task.find({}, function(err,tasks){
        if(err){
            console.log("error in fetching tasks from db");
            return;
        }
    
    return res.render('home', { 
        title: "My todo-list app",
        todo_List: tasks
     });
    });
    });

// Create a new task 
app.post('/create-task', function(req,res){
    //  todoList.push(req.body);
    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    },function(err, newTask){
        if(err){
            console.log("error in creating a task");
            return;
        }
        return res.redirect('back');
    });
});


// Deleting a task
app.post('/delete-task', function(req, res){ 
// Get the ID of the task and delete selected using findByIdAndDelete 
    Object.keys(req.body).forEach(function(key){
        Task.findByIdAndDelete(key,function(err){
            if(err){
                console.log('Error in deleting an list from database',err);
                return;
            }
            console.log('One list is deleted');
            
        });
    });
    return res.redirect('back');

});

app.listen(port,function(err){
    if(err){
        // using interpolation
        console.log(`Error in running the server: ${err}`);
        return;
    }

    console.log(`Server is ruuning on: ${port}`);
});