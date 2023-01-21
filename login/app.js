const express = require('express');
const mysql = require('mysql')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')  
// other imports
const path = require("path");
const { resourceLimits } = require('worker_threads');

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
//registering the user
app.use(express.urlencoded({extended: 'false'}))
//recieve form values as JSON
app.use(express.json()) 
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


  
 //retrive user form values 
 app.post("/auth/register", (req, res) => {    
   const { name, email, password, password_confirm } = req.body
   db.query('SELECT email FROM users WHERE email = ?', [email], async (error, res) => {
       if(error){
           console.log(error)
       }
    //if passwords match 
       if(result.length > 0){
           return res.render('register',{
               message: 'This email is already captured'
           })
       }  else if (password !== password_confirm){
           return res.render('register',{
               message : "Passwords dont Match"
           })
       }

       //if conditions are met 
       let hashedPass = await bcrypt.hash(password, 8)
       db.query('INSERT INTO users SET?', {name: name, email: email, password: hashedPass})
       if(error){
           console.log(error)
       }else {
           return res.render('register', {
               message: "User registered"
           })
       }
    })
})
app.listen(5000, () =>{
    console.log("Server has started on port 5000")
})


