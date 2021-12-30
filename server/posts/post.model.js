const { timeStamp } = require('console')
const mongoose = require('mongoose')

const postSchema = mongoose.Schema( {
    headline: {
        type: String
    }, 
    text: {
        type: String, 
        required: true
    },
    likes: {
        type: []
    }
}, { timestamps: true })

module.exports = mongoose.model('Posts', postSchema)