
const express=require('express');

const path=require('path');

const port=8000;

var bodyParser = require('body-parser');

const db= require('./config/mongoose');

const Task=require('./models/task');

const app= express();

app.set('view engine' ,'ejs');

app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());

app.use(express.static('assets'));

app.use(express.urlencoded({ extended: true }));

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

app.post('/create-task', function(req,res){
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

app.post('/delete-task', function(req, res){ 
    Object.keys(req.body).forEach(function(key){
        Task.findByIdAndDelete(key,function(err){
            if(err){
                console.log('Error in deleting a list from database',err);
                return;
            }
            console.log('One list is deleted');
            
        });
    });
    return res.redirect('back');

});

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }

    console.log(`Server is ruuning on: ${port}`);
});
