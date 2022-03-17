////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

////////////////////////////////////////////
// Create router
////////////////////////////////////////////
const router = express.Router()



router.get('/', (req, res) => {
	// Make fetch call to api with api key in header
	fetch(`https://api.thecatapi.com/v1/breeds`,  {method: 'GET',
		headers: {
			'X-API-KEY': `${process.env.API_KEY}`,
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},	
	})
	// pass response from fetch call to the .then and return it's value as json
	.then(response => response.json())
	// now you pass this json response
    .then((catsBreedData) => {
		// console.log(catsBreedData)
		console.log(catsBreedData)
	})
    .catch(error => console.error(error))

	console.log(`https://api.thecatapi.com/v1/breeds?api_key=${process.env.API_KEY}`)
    const { username, userId, loggedIn } = req.session
	res.render('index.liquid', { loggedIn, username, userId })
})