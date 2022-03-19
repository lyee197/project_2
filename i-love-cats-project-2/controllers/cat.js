////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const express = require('express')
const Cat = require('../models/cat')
const fetch = require('node-fetch')
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
// const addCat = (cat) => {
//     let img = document.createElement('img')
//     img.src = `${cat.url}`

// }
let catArray

router.get('/', (req, res) => {
    fetch(`http://api.thecatapi.com/v1/images/search`,  {
		method: 'GET',
		headers: {
			'X-API-KEY': `${process.env.API_KEY}`,
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},	
	})
    .then((response) => {
        return response.json()
    })
    .then((catData) => {
        const { username, userId, loggedIn } = req.session
		console.log(catData[0])
        res.render('cat/index', { catStuff: catData, username, loggedIn })
	})
    .catch(error => console.error(error))
    // Cat.find({ owner: userId })
    // const { username, userId, loggedIn } = req.session
    //     .then((cat) => {
    //         res.render('cat/index', { cat, username, loggedIn })
    //     })
    //     // show an error if there is one
	// 	.catch(error => {
	// 		res.redirect(`/error?error=${error}`)
	// 	})
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
router.get('/:id/edit', (req, res) => {
    Cat.findById( req.params.id )
        .then((cat) => {
            const { username, userId, loggedIn } = req.session
            res.render('cat/edit', { cat, username, loggedIn})
        })
        .catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

//show
router.get('/:id', (req, res) => {
    Cat.findById( req.params.id )
        .then((cat) => {
            const { username, userId, loggedIn } = req.session
            res.render('cat/show', { cat, username, loggedIn})
        })
        .catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// create -> POST route that actually calls the db and makes a new document <----
router.post('/', (req, res) => {
    //
    imgUrl = req.body.url
    req.body.owner = req.session.userId
    Cat.create(req.body)
        .then((cat) => {
            console.log('this was returned from create', cat)
            res.redirect(`/cat/${cat.id}`)
        })
        .catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
// router.get('/:catApiId/edit', (req, res) {
//     // we need to get the 
router.edit
// })
// update route
router.put('/:id', (req, res) => {
    const catId = req.params.id
    Cat.findByIdAndUpdate(catId, req.body, { new: true})
        .then((cat) => {
            console.log('Cat', cat)
            res.redirect(`/cat/${cat.id}`)
        })
        .catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route

// delete route

// Export the Router
module.exports = router

//