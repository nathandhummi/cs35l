//grab any sensitive info from .env like port number
require('dotenv').config()

const express = require('express')
//access our routes from routes folder
const noteRoutes = require('./routes/reviews')
const menuRoutes = require('./routes/menus')
const foodItemsRoutes = require('./routes/foodItems');
app.use('/api/foodItems', foodItemsRoutes);


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

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})
app.use(cors(corsOptions))
//uses all the routes from routes folder as our route.
app.use('/api/reviews',noteRoutes)
app.use('/api/menus', menuRoutes);
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



