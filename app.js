const express = require('express'),
      app = express(),
      body_parser = require('body-parser'),
      path = require('path'),
      mongoose = require ('mongoose'),
      Campground = require('./models/Campground'),
      Comment = require('./models/Comment'),
// const seedDB = require('./seedDB')
      User = require('./models/User'),
      method_override = require('method-override')
      express_session = require('express-session'),
      passport = require('passport'),
      LocalStrategy = require('passport-local');


const campgroundRoutes = require('./routes/campgrounds')
const commentRoutes = require('./routes/comments')
const authRoutes = require('./routes/auth')

// seedDB()


mongoose.connect('mongodb+srv://bojan:bojan@mongodbtest-mjihi.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true }, () => console.log('db connected'))

app.set('view engine', 'ejs')
app.use(express_session({
    secret: 'the truth is out there',
    resave: false,
    saveUninitialized: false
}))

//PASSPORT CONFIG 
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



app.use(express.static(path.join(__dirname, '/public')))
app.use(body_parser.urlencoded({extended: true}))

app.use(method_override('_method'))

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next()
})

app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/comments', commentRoutes)
app.use(authRoutes)

app.get('/', (req, res) => {
    res.render('home')
})

app.get('*', (req, res) => {
    res.render('error')
})


const port = process.env.PORT || 3000; 

app.listen(port, () => console.log(`Bushcraft Serbia is running on port ${port}`))