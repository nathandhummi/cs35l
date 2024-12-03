//grab any sensitive info from .env like port number
require('dotenv').config()

const express = require('express')
//access our routes from routes folder
const reviewRoutes = require('./routes/reviews')
const foodItemsRoutes = require('./routes/foodItems');
const passport = require('./passport'); // Import the configured passport file
const authRoutes = require('./routes/authRoutes'); // Create auth routes
const session = require('express-session'); // Used for User Authentication
const path = require('path');



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

// Middleware for sessions
app.use(
    session({
      secret: process.env.SESSION_SECRET, // Store in .env for security, // Replace with a secure key
      resave: false,
      saveUninitialized: false,
    })
  );

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/reviews',reviewRoutes)

app.use('/api/foodItems', foodItemsRoutes);

// Routes for Authentication
app.use('/auth', authRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all route to serve React app for unhandled routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})
//uses all the routes from routes folder as our route.

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