//grab any sensitive info from .env like port number
require('dotenv').config()

const express = require('express')
//access our routes from routes folder
const noteRoutes = require('./routes/notes')
//importing mongoose
const mongoose = require('mongoose')

//express app
const app = express()

//middleware that logs the activies of the get,post,put,delete requests
app.use(express.json())
app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})
//uses all the routes from routes folder as our route.
app.use('/api/notes',noteRoutes)

//connect to database, our URI/password needs to be correct
mongoose.connect('mongodb+srv://matthewma003:test123@cluster0.d9fol.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(()=>{
        //listen for requests once we are connnected the database
        app.listen(4000, () => {
            console.log('connected to database and listening on port', 4000)
        })
        
    })
    .catch((error)=>{
        console.log(error)
    })
//listen for requests



