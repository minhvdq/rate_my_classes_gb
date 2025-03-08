const newUserRouter = require('express').Router()
const NewUserToken = require('../models/NewUserToken')
const User = require('../models/User')

newUserRouter.get('/:id', async (req, res) => {
    const id = req.params.id

    const token = await NewUserToken.findById(id)
    if( !token ) {
        res.status(400).json({error: "Invalid Token"})
        return
    }
    
    const newUser = new User({
        name: token.name,
        email: token.email,
        passwordHash: token.hashPassword,
        reviews: [],
    })

    const savedUser = await newUser.save()

    res.status(201).json(savedUser)
    window.location.href = "http://localhost:5714/authen"
})

module.exports = newUserRouter