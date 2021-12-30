const express = require('express')
const controller = require('./controller')

const userRouter = express.Router();


userRouter.get('/user', (req, res) => { res.send('list of ats')})
userRouter.get('/getUser', controller.getUser)
userRouter.post('/createUser', controller.createUser)
userRouter.post('/login', controller.handleLogin)
userRouter.delete('/logout', controller.handleLogout)
userRouter.get('/currentUser', controller.getCurrentUser)

module.exports = userRouter
