const mongoose = require('./connection')
const { Schema, model } = mongoose
const faveCatSchema = new Schema(
    {
        imgUrl: { type: String },
        catApiId: { type: String },
        // comments: { },
        // owner: userId reference
        owner: { },
        title: { }
    },
    { timestamps: true }
)

const Cat = model('Cat', faveCatSchema)

module.exports = Cat
// -----------TAKE ONE STEP AT A TIME----------------
// build a page that aquires one random cat
// page has a button to aquire new random cat
// button that adds to favorites , Sends to show page to give title to image