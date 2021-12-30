const Posts = require('./post.model')
const User = require('../users/user.model')

module.exports.addPost = async function(req, res, next ) {
    const { headline, text } = req.body
    if(req.session.role === 'admin') {
        const newPost = await new Posts ({
            headline: headline, 
            text: text
        })
        await newPost.save()
    } else {
        res.send('You need to be admin to create a post')
    }
}

module.exports.updatePost = async function(req, res, next) {
    const id = req.params.id
    const currentPost = await Posts.findByIdAndUpdate(id, {
        headline: req.body.headline, 
        text: req.body.text
    }) 

    if(currentPost) {
        res.status(200).json(currentPost)
    } else {
        res.status(404).json('cant find the product')
    }
}

module.exports.deletePost = async function(req, res, next) {
    const id = req.params.id
    if(req.session.role === 'admin') {
        await Posts.findByIdAndRemove(id)
        res.status(200).json('Post deleted')
    } else {
        res.status(403).json('You do not have permission to delete this post')
    }
}

module.exports.allPosts = async function(req, res) {
    const posts = await Posts.find().sort({ createdAt: -1})
    res.send(posts)
}

module.exports.getSpecificPost = async function(req, res) {
    const id = req.params.id
    const specificPost = await Posts.findById(id)
    res.send(specificPost)
}
