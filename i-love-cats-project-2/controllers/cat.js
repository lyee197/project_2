////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const express = require('express')
const Cat = require('../models/cat')

////////////////////////////////////////////
// Create router
////////////////////////////////////////////
const router = express.Router()

////////////////////////////////////////////
// Router Middleware
////////////////////////////////////////////
// create some middleware to protect these routes
// Authorization middleware
router.use((req, res, next) => {
	// checking the loggedin boolean of our session
	if (req.session.loggedIn) {
		// if they're logged in, go to the next thing(thats the controller)
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/auth/login')
	}
})

////////////////////////////////////////////
// Routes
////////////////////////////////////////////

// index ALL fruits route
router.get('/', (req, res) => {
	const { username, userId, loggedIn } = req.session
    Cat.find({ owner: userId })
        .then((cat) => {
            res.render('cat/index', { cat, username, loggedIn })
        })
        // show an error if there is one
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's examples
router.get('/favorite', (req, res) => {
    // find the cats
    Cat.find({ owner: req.session.userId})
        // find user
        .then((cat) => {
            //log user
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            res.render('cat/index', { cat, username, loggedIn})
        })
        // show an error if there is one
        .catch((error) => {
            res.json({ error })
        })
})

// new route -> GET route that renders our page with the form

// create -> POST route that actually calls the db and makes a new document

// edit route -> GET that takes us to the edit form view
// router.get('/:catApiId/edit', (req, res) {
//     // we need to get the 

// })
// update route

// show route

// delete route

// Export the Router
module.exports = router