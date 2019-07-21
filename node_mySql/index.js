var express = require("express");
var app = express();
var mysql      = require('mysql');


app.listen("7788",function(error){
    if(error){
        console.log("port not working");
    }else{
        console.log("port working on 7788");
    }
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

//mysql Connect

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database :  'nani',
    // port: '5432'
  });
  
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }else{
    console.log('connected to DB');
    }
  });

//End mysql Connect


//Create DB

app.get('/createdb', (req, res)=>{
let sql = 'create DB for mysql';
connection.query(sql, (err, result)=>{
    if (err) throw err;
    console.log(result);
    res.send('Database Created');
})
})

//bodyparser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//End bodyparser

//Registration
app.post("/user/registration", function(req,res){
    // console.log(req.body);
    var input_firstname = req.body.firstname;
    var input_lastname = req.body.lastname;
    var input_email = req.body.email;
    var input_phone = req.body.phone;
    var input_username = req.body.username;
    var input_password = req.body.password;

    var dataObject = {
        firstname    :  input_firstname,
        lastname     :  input_lastname,
        email        :  input_email,
        phone        :  input_phone,
        username     :  input_username,
        password     :  input_password, 
    }

    var query = connection.query('INSERT INTO user SET ?', dataObject , 
    function (error, results, fields) {
        if (error) {
            
            console.log(error);
            res.send(error);
        }
        else{
            console.log("Registration Success");//  For checking success or not in Gitbash
            res.send("registration success");// For checking success or not in Postman
        }  
      });
    
});
//End Registration

//Login
app.post("/user/login", function(req,res){
    var input_username = req.body.username;
    var input_password = req.body.password;

    //Check Login 
    
    var columns = ['firstname'];
    var query = connection.query('SELECT ?? FROM ?? WHERE username=? and password=?' , 
    [columns, 'user', input_username, input_password], function (error, results, fields) {
      if (error) {throw error;}
      else{
        console.log(results.length);
        if(results.length==0){
            var res_msg = "no data";

        }else {
            var res_msg = "success";
        }
        res.send(results);
        console.log("Login success");
      }
    });
});
//End Login

//ViewAll
app.get("/user/viewall", function(req,res){
    var columns = ['firstname', 'lastname','email','phone'];
var query = connection.query('SELECT ?? FROM ??', [columns, 'user'], 
function (error, results, fields) {
  if (error) {throw error;}
  else{
    res.send(results);
  }
}); 
});
//End ViewAll


//View or READ


app.post("/user/view", function(req,res){
    var username = req.body.username;
    var columns = ['firstname', 'lastname','email','phone'];
var query = connection.query('SELECT ?? FROM ?? WHERE username=?', 
[columns, 'user', username], function (error, results, fields) {
  if (error) {throw error;}
  else{
      console.log(results);
    res.send(results[0]);
  }
});
    
});
//End View or READ

//Edit or UPDATE
app.post("/user/edit", function(req,res){

    var input_firstname = req.body.firstname;
    var input_lastname = req.body.lastname;
    var input_email = req.body.email;
    var input_phone = req.body.phone;
    var input_username = req.body.username;

connection.query('UPDATE user SET firstname = ?, lastname = ?, email = ?, phone = ? WHERE username = ? ', 
    [ input_firstname, input_lastname, input_email, input_phone, input_username], 
    function (error, results, fields) {
        if (error) {throw error;}
        else{
            res.send("Edited successfully");
        // res.send(results);
        }
      });
});
//End Edit or UPDATE

//Change Password
app.post("/user/changepassword", function(req,res){
    // console.log(req.body);
    var input_oldpassword = req.body.oldpassword;
    var input_newpassword = req.body.newpassword;
    var input_username = req.body.username;

    //Check password
    var columns = ['firstname'];
    var query = connection.query('SELECT ?? FROM ?? WHERE username=? and password=?' , 
    [columns, 'user', input_username, input_oldpassword], function (error, results, fields) {
      if (error) {throw error;}
      else{
          console.log(results);
        if(results.length==0)
        {
            console.log("please enter correct password");
        }
            else{ 
    //Update Password  

            connection.query('UPDATE user SET password =? WHERE username = ?', 
            [input_newpassword, input_username], 
             function (error, results, fields) {
           if (error) {throw error;}
             else{
        res.send("updated password");
          }

          });
                    
                
            }
        }
        console.log(req.body);
      
    });

     //End Check password


});
//End Change Password