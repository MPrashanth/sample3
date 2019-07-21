var express = require("express");
var app = express();
var nodemailer = require("nodemailer");

var moment = require('moment');


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



var psql = require('pg');
const connection = new psql.Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'test',
  port: '5432'
});
  
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected to DB ' );
  });


//bodyparser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//End bodyparser

//Registration
app.post("/user/registration", function(req,res){

    var UserReg = req.body.username;

    const Query = {
        text: 'INSERT into users (username, password, email, phone, firstname, lastname) VALUES($1, $2, $3, $4, $5, $6)',
        values: [req.body.username, req.body.password, req.body.email, req.body.phone, req.body.firstname, req.body.password],
       }
    var query = connection.query(Query,
    function (error, results, fields) {
        if (error) { 
            console.log(error);
            res.send(error);
        }
        
        else{
            //Email Logic for sending
            var transporter = nodemailer.createTransport({
                service:'gmail',
                auth: {
                    user:'prashanth.m@vdartdigital.com',
                    pass: 'hffh vgdb sxlr fmnz'
               }
            });
            var mailOptions = {
                from:'prashanth.m@gmail.com',
                to: 'iqbal.m@vdartdigital.com',
                subject: ' User ' + UserReg + ' Registered Successfully ',
                text: UserReg + ' your are welcome to the Circus Show by login to the app'
            }
            console.log("Sending mail")
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response)
                }
            })
            console.log("Registration Success");//  For checking success or not in Gitbash
            res.send("registration success");// For checking success or not in Postman
        }
        
      }); 
});
//End Registration

//Login
app.post("/user/login", function(req,res){
    var input_username = req.body.username;

    var Query = 'SELECT username, password FROM users';

    //Check Login 
    
    var query = connection.query(Query, function (error, results, fields) {
      if (error) {throw error;}
      else{
        console.log(results.length);
        if(results.length==0){
            var res_msg = "no data";
        }else {
            var res_msg = "success";
        }
        var date = new Date();
        
        var dateTimeNow = moment(date).format('YYYY-MM-DD HH:mm:ss');
        console.log("dateTimeNow in 125", dateTimeNow);

        const loginquery = {
            text: 'update users set login=$1 where username=$2',
            values: [dateTimeNow, input_username],
           }

        var loginQuery = connection.query(loginquery, function (error, results, fields) {
            if (error) {throw error;}
            else{
                // console.log("Results", results);
            }
        })
        res.send(results);
        console.log("Login success");
      }
    });
});


app.post("/user/logout", function(req,res){
    var input_username = req.body.username;


const logoutquery = {
    text: 'select login from users where username=$1',
    values: [input_username],
   }
   var logoutTime = new Date();

   console.log("logoutTime", logoutTime);
    var logoutQuery = connection.query(logoutquery, function (error, results, fields) {
        if (error) {throw error;}
        else{
            var Login = results.rows[0].login;
            console.log("Results", Login);

           //sending mail
            var transporter = nodemailer.createTransport({
                service:'gmail',
                auth: {
                    user:'prashanth.m@vdartdigital.com',
                    pass: 'hffh vgdb sxlr fmnz'
               }
            });
            var mailOptions = {
                from:'prashanth.m@vdartdigital.com',
                to: 'iqbal.m@vdartdigital.com',
                subject: 'Logged out successfully',
                text: ' User: ' + input_username +'\n Login Time :'+ Login +'\n  Logout Time: ' + logoutTime
            }
            console.log("Sending mail")
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response)
                }
            })
        }
    })
});


