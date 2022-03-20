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
	// find the cats
	Cat.find({})
		// then render a template AFTER they're found
		.then((cats) => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			// console.log(fruits)
			res.render('cat/index', { cats, username, loggedIn })
		})
		// show an error if there is one
        .catch((error) => {
            res.redirect(`/error?error=${error}`)
        })
})



////////////////////////////////////////////////////////////////////////
// index that shows only the user's examples
////////////////////////////////////////////////////////////////////////
router.get('/favorite', (req, res) => {
    // find the cats
    Cat.find({ owner: req.session.userId})
        // find user
        .then((cats) => {
            //log user
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            res.render('cat/index', { cats, username, loggedIn})
        })
        // show an error if there is one
        .catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})
////////////////////////////////////
// 'new' cat
////////////////////////////////////
router.get('/new', (req, res) => {
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
        res.render('cat/new', { catStuff: catData, username, loggedIn })
	})
    .catch((error) => {
        res.redirect(`/error?error=${error}`)
    })
})
//show

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// create -> POST route that actually calls the db and makes a new document <----
////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
// router.edit
// })

////////////////////////////////////////////////////////////////////////
// -- Edit Route ---    new route -> GET route that renders our page with the form
////////////////////////////////////////////////////////////////////////
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


////////////////////////////////////
// update route
////////////////////////////////////
router.put('/:id/edit', (req, res) => {
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

////////////////////////////////////
// show route
////////////////////////////////////
router.get('/:id', (req, res) => {
    Cat.findById( req.params.id )
        // .populate()
        .then((cat) => {
            const { username, userId, loggedIn } = req.session
            res.render('cat/show', { cat, username, loggedIn, userId})
        })
        .catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

////////////////////////////////////
// delete route
////////////////////////////////////
router.delete('/:id', (req, res) => {
	// get the fruit id
	const catId = req.params.id
	// delete the fruit
	Cat.findByIdAndRemove(catId)
		.then((cat) => {
			console.log('this is the response from FBID', cat)
			// res.redirect('/fruits')
            res.redirect('/cat/favorite')
		})
        .catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

////////////////////////////////////
// Export the Router
////////////////////////////////////
module.exports = router
