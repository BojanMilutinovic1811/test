const mongoose = require('mongoose')


const campgroundSchema = new mongoose.Schema({
    location: String,
    image: String,
    description: String,
    created: { type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'bushcraftuser'
        },
        username: String
    }, 
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

module.exports = mongoose.model('Campground', campgroundSchema) 
