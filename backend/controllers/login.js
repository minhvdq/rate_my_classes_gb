const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findOne({email: body.email})
    
    const passwordCorrect = !user ? false : await bcrypt.compare(body.password, user.passwordHash)
    
    if(!( user && passwordCorrect)){
        return response.status(400).json({error: "invalid username or password"})
        
    }

    const userForToken = { 
        email: user.email,
        id: user.id
    }

    const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60*60 })

    response.status(200).json({ token, email: user.email, name: user.name, id: user.id, reviews: user.reviews })
})

module.exports = loginRouter