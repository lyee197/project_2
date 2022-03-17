/////////////////////////////////////
// Import Dependenciese
/////////////////////////////////////
const express = require('express')
const mongoose = require('mongoose')

// we need our Cat MODEL because comments are ONLY a schema
// so we'll run queries on cats, and add in comments

const Cat = require('../models/cats')
const router = require('./user')

/////////////////////////////////////
// Import Dependenciese
/////////////////////////////////////
// only need to routes for comments right now
// POST -> to create a comment
router.post('', (req, res) => {
    const catId = req.params.catId
    // we'll find the cat with the catId
    Cat.findById(catId)
    .then(cat => {
        cat.comments.push(req.body)
        return cat.save()
    })
    // then we'll adgust req.body to include an author
    .then(cat => {
        res.redirect(`/cats/${cat.id}`)
    })
    .catch(error => {
        res.send(error)
    })
})

// Delete -> to destroy a comment
// we'll ust two params to make our life easier
// first the id of the cat, since we need to find it
// the the id of the comment, since we want to delete it
router.delete('delete/:catId/:commId', (req, res) => {
    // first we want to parse our our ids
    const catId = req.params.catId
    const commId = req.params.commId
    // the we'll find the cat
    Cat.findById(catId)
        .then(cat => {
            const theComment = cat.comments.id(commId)
            if ( theComment.author == req.session.userId) {
                // then we'll delete the comment
                theComment.remove()
                // save the fruit
                return cat.save()
            } else {
                return
            }
        })
        .then(cat => {
            // redirect to the cat show page
            res.redirect(`/cats/${catId}`)
        })
        .catch(error => {
            // catch any errors
            res.send(error)
        })
})

/////////////////////////////////////
// Import Dependenciese
/////////////////////////////////////
module.exports = router