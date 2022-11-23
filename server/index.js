const express = require("express")
const passport = require('passport')
const app = express()
const bodyparser = require("body-parser")
const localStrategy = require("passport-local")
const customStrategy = require('passport-custom')
const methodoverride = require("method-override")
const mongoose = require("mongoose")
const localmongo = "mongodb://localhost:27017/foodium"
const cors = require("cors");
const User = require('./models/user');
const { signinHandler, signupHandler, signoutHandler, failHandler} = require('./signHandler.js')
const {authenticateHandler, hashHandler, hashcompHandler} = require("./authenticateHandler.js")
const { fetchAnnouncementHandler} = require('./announcementHandler')
const port = 3001 || process.env.PORT
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
mongoose.connect(localmongo, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(cors(corsOptions))
app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({
    limit: '50mb',
    extended: true
}))
app.use(methodoverride("_method"))
app.use(express.static("public"))

var server = app.listen(port, function () {
    console.log("server started " + port)
})
app.use(require("express-session")({
    secret: "wherever",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.get('/entry', (_req, res)=> {
    console.log('entered entry page')
    const pos = ['Student',
    'Faculty',
    'Mess Vendor',
    'Canteen Vendor',
    'Mess Inspector',
    'Canteen Inspector',
    'Admin',
    'Guest']
    const positions = pos.map((item)=> {return {value: item, label: item}})
    res.json({
        result: 'success',
        positions: positions
    })
})
app.post('/signin', passport.authenticate('custom', { failureRedirect: '/fail' }), signinHandler)
app.post('/signout', signoutHandler)
app.post("/signup", signupHandler)
app.get('/signout', signoutHandler)
app.get('/fail', hashHandler, failHandler)
app.get('/authenticate', authenticateHandler)
app.get('/hashcomp', hashcompHandler)
app.get('/fetchannouncement', fetchAnnouncementHandler)
const messrouter = require('./mess/messroute')
const messvendorrouter = require('./messvendor/messvendorroute')
const canteenrouter = require('./canteen/canteenroute')
const canteenvendorrouter = require('./canteenvendor/canteenvendorroute')
app.use('/mess', messrouter) 
app.use('/messvendor', messvendorrouter)
app.use('/canteen', canteenrouter)
app.use('/canteenvendor', canteenvendorrouter)