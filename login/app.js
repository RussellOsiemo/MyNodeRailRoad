const express = require('express');
const mysql = require('mysql')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')  
// other imports
const path = require("path")

const publicDir = path.join(__dirname, './public')



//create an express app 
const app = express();
dotenv.config({path: './.env'})
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_ROOT,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

//connect to database 
db.connect((error) =>{
    if(error) {
        console.log(error)
    } else {
        console.log('MYSQL connected')
    }
})

app.set('view engine', 'hbs')
app.use(express.static(publicDir))
//register a route for rendering index.hbs on the homepage
app.get('/', (req, res) =>{
    res.render('index')

})
   //get register page 
   app.get('/register',( req, res) =>{
    res.render('register')
   })
    //get login page 
    app.get('/login',( req, res) =>{
        res.render('login')
       })


 //registering the user
    
app.listen(5000, () =>{
    console.log("Server has started on port 5000")
})


