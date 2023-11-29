// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

// Load data from json file
var comments = require('./comments.json');

// Set port to 3000
app.set('port', (process.env.PORT || 3000));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

// Set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home page
app.get('/', function(req, res){
    res.render('index', {
        title: 'Comments',
        comments: comments
    });
});

// Add comments
app.post('/comments/add', function(req, res){
    var newComment = {
        name: req.body.name,
        comment: req.body.comment,
        created_at: new Date()
    };

    comments.push(newComment);

    fs.writeFile('./comments.json', JSON.stringify(comments), 'utf8', function(err){
        if(err){
            throw err;
        }
    });

    res.redirect('/');
});

// Delete comments
app.delete('/comments/delete/:id', function(req, res){
    comments = comments.filter(function(comment){
        return comment.comment.replace(/ /g, '-') !== req.params.id;
    });

    fs.writeFile('./comments.json', JSON.stringify(comments), 'utf8', function(err){
        if(err){
            throw err;
        }
    });

    res.sendStatus(200);
});

// Start server
app.listen(app.get('port'), function(){
    console.log('Server started on port ' + app.get('port'));
});