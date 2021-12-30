const User = require('./user.model')
const bcrypt = require('bcrypt')
const express = require('express')

module.exports.getUser = async (req, res, next) => {
    const result = await User.find()
    res.json(result)
}

module.exports.createUser = async ( req, res, next) => {

    const registeredUsers = await User.findOne({email: req.body.email})
    if(registeredUsers !== null){
        res.send('email already exist')
        return
    }

    
    const newUser = new User( {
        firstname: req.body.firstname, 
        lastname: req.body.lastname, 
        phone: req.body.phone, 
        email: req.body.email, 
        password: req.body.password, 
        role: req.body.role
    })

    await newUser.save()

}

module.exports.handleLogin = async function(req, res, next) {
    const { email, password } = req.body

    const currentUser = await User.findOne({email: email})
    
    if(currentUser) {
        if(!currentUser || !await bcrypt.compare(password, currentUser.password)) {
            console.log('Wrong password')
            return
        } else {

            req.session.name = currentUser.firstname
            req.session.lastname = currentUser.lastname
            req.session.email = currentUser.email
            req.session.role = currentUser.role
            
            return res.status(200).json(currentUser.role)
        }
    } else {
        res.send('email doesnt exist')
    }
}

module.exports.handleLogout = async function(req, res, next) {
    if(req.session.name) {
        req.session = null 
        return res.status(200).json('You are now logged out')
    } else {
        res.status(500).json('You are already signed out')
    }
}

module.exports.getCurrentUser = async function(req, res, next) {
    const currentUser = await User.findOne({email: req.session.email})
    res.send(currentUser)
}