const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require("express-session")
const passport = require('passport')

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

//middleware
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
    methods: "GET, POST, PUT, DELETE"
  })
)

//setup session
app.use(session({
    secret: "Berde444Greendee12345!@#$%",
    resave: false,
    saveUninitialized: true
}))
//setup passport
app.use(passport.session());
app.use(passport.initialize());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((error) => console.log('Database not connected', error))

app.use('/', require('./routes/authRoutes'))

const port = 8000;
app.listen(port, () => console.log(`Server is running on ${port}`))