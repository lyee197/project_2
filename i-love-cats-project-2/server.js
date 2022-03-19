////////////////////
//  Dependencies  //
////////////////////
require("dotenv").config() // make env variables available
const express = require("express")
const middleware = require('./utils/middleware')
const ExampleRouter = require('./controllers/example')
const UserRouter = require('./controllers/user')
const BreedRouter = require('./controllers/breed')
const CatRouter = require('./controllers/cat')
const User = require("./models/user")
const fetch = require('node-fetch')

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
app.use('/examples', ExampleRouter)
// app.use('/breed', BreedRouter)
app.use('/cat', CatRouter)
// app.use('/comments', CommentRouter)
// working from goro
// app.get('/', (req, res) => {
// 	// Make fetch call to api with api key in header
// 	fetch(`https://api.thecatapi.com/v1/images/search`,  {method: 'GET',
// 		headers: {
// 			'X-API-KEY': `${process.env.API_KEY}`,
// 			'Accept': 'application/json',
// 			'Content-Type': 'application/json'
// 		},	
// 	})
// 	// pass response from fetch call to the .then and return it's value as json
// 	.then(response => response.json())
// 	console.log(response.json())
// 	// now you pass this json response
//     .then((catsBreedData) => console.log(catsBreedData))
//     .catch(error => console.error(error))

// 	console.log(`https://thecatapi.com/v1/images?api_key=${process.env.API_KEY}`)
//     const { username, userId, loggedIn } = req.session
// 	res.render('index.liquid', { loggedIn, username, userId })
// })


app.get('/', (req, res) => {
	// Make fetch call to api with api key in header
	// fetch(`https://api.thecatapi.com/v1/images/search`,  {
	// 	method: 'GET',
	// 	headers: {
	// 		'X-API-KEY': `${process.env.API_KEY}`,
	// 		'Accept': 'application/json',
	// 		'Content-Type': 'application/json'
	// 	},	
	// })
	// // pass response from fetch call to the .then and return it's value as json
	// .then(response => response.json())
	// // now you pass this json response
    // .then((catsBreedData) => {
	// 	// console.log(catsBreedData)
	// 	console.log(catsBreedData)
	// })
    // .catch(error => console.error(error))

	console.log(`https://api.thecatapi.com/v1/breeds?api_key=${process.env.API_KEY}`)
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