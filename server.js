//To Be Installed "npm install express" "npm install ejs"*****************

var express = require("express"); //importing our module from node

var app = express(); //creating an express app

var bodyParser = require('body-parser'); //node module to get request object from post data

var mongoose = require('mongoose'); //gives us access to db/mongoose

app.use(express.static(__dirname + "/static")); //setting project to use our static folder

app.use(bodyParser.urlencoded({extended: true})); //setting project to use our body parser

app.set('views', __dirname + '/views');  //setting project to use views

app.set('view engine', 'ejs'); //telling our project to use ejs

//**************************************************************************database info************** */

mongoose.connect('mongodb://localhost/basic_mongoose');//connect to our db basic 'mongoose'

var UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
   })
   mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
   var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'

//******************************************************************************************************** */

app.get('/', function (request, response){
    User.find({}, function(err, users) {
        User.find({}, function(err, users) {
            if(err){
                console.log('error')
            }
            else{
                var users = users
                response.render('index',{users: users});
            }
          })
      })
})//setting how to handle our route

app.post('/users', function(req, res) {
    console.log("POST DATA", req.body);
    var user = new User({name: req.body.name, age: req.body.age});
    // Save and run a callback function with any errors
    user.save(function(err) {
      if(err) {
        console.log('something went wrong');
      } else {
        console.log('successfully added a user!');
        res.redirect('/');
      }
  })
})

app.listen(8000,function(){
	console.log("listening on 8000")
})
//setting our ip address
