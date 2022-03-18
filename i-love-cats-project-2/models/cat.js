const mongoose = require('./connection')

const commentSchema = require('./comment')

const User = require('./user')

const { Schema, model } = mongoose

const faveCatSchema = new Schema(
    {
        imgUrl: { type: String },
        catApiId: { type: String },
        owner: {
            // references the type 'objectId'
            type: Schema.Types.ObjectId,
            // references the model: 'User'
            ref: 'User'
        },
        title: { type: String },
        comments: [commentSchema]
    },
    { timestamps: true }
)

const Cat = model('Cat', faveCatSchema)

module.exports = Cat
// -----------TAKE ONE STEP AT A TIME----------------
// build a page that aquires one random cat
// page has a button to aquire new random cat
// button that adds to favorites , Sends to show page to give title to image