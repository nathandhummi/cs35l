//grab any sensitive info from .env like port number
require('dotenv').config()

const express = require('express')
//access our routes from routes folder
const reviewRoutes = require('./routes/reviews')
const foodItemsRoutes = require('./routes/foodItems');


//importing mongoose
const mongoose = require('mongoose')
//use cors to connect frontend with backend
const cors = require('cors');
const corsOptions = {
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200
}
//express app
const app = express()

//middleware that logs the activies of the get,post,put,delete requests

app.use(express.json())
app.use(cors(corsOptions))

app.use('/api/foodItems', foodItemsRoutes);
app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})
//uses all the routes from routes folder as our route.
app.use('/api/reviews',reviewRoutes)
//connect to database, our URI/password needs to be correct
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen for requests once we are connnected the database
        app.listen(4000, () => {
            console.log('connected to database and listening on port', process.env.PORT)
        })
        
    })
    .catch((error)=>{
        console.log(error)
    })
//listen for requests