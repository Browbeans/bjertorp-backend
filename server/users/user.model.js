const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String, 
        required: true, 
    }, 
    lastname: {
        type: String, 
        required: true
    }, 
    phone: {
        type: String, 
        required: true,
    }, 
    email: {
        type: String, 
        required: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    role: {
        type: String, 
        required: true
    }
})

userSchema.pre("save", async function(next) {
    console.log('hello')
    this.password = await bcrypt.hash(this.password, 10)
})

module.exports = mongoose.model('Users', userSchema)