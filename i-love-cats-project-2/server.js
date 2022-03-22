////////////////////
//  Dependencies  //
////////////////////
require("dotenv").config() // make env variables available
const express = require("express")
const middleware = require('./utils/middleware')
// const ExampleRouter = require('./controllers/example')
const UserRouter = require('./controllers/user')
const BreedRouter = require('./controllers/breed')
const CatRouter = require('./controllers/cat')
const User = require("./models/user")
const fetch = require('node-fetch')
const CommentRouter = require('./controllers/comment')

// SEE MORE DEPENDENCIES IN ./utils/middleware.js
// user and resource routes linked in ./utils/middleware.js

//////////////////////////////
// Middleware + App Object  //
//////////////////////////////
const app = require("liquid-express-views")(express())

middleware(app)

////////////////////
//    Routes      //
////////////////////

app.use('/auth', UserRouter)
app.use('/cat', CatRouter)
app.use('/comments', CommentRouter)


app.get('/', (req, res) => {
	// console.log(`https://api.thecatapi.com/v1/breeds?api_key=${process.env.API_KEY}`)
    const { username, userId, loggedIn } = req.session
	res.render('index.liquid', { loggedIn, username, userId })
})

app.get('/error', (req, res) => {
	const error = req.query.error || 'This Page Does Not Exist'
    const { username, loggedIn, userId } = req.session
	res.render('error.liquid', { error, username, loggedIn, userId })
})

// if page is not found, send to error page
app.all('*', (req, res) => {
	res.redirect('/error')
})



//////////////////////////////
//      App Listener        //
//////////////////////////////
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})

app.listen(process.env.PORT || 3000)