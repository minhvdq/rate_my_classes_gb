const loginRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')


loginRouter.post( async ( req, res ) => {
    const body = req.body
    const password = body.password
    const user = User.findOne({email: body.email})

    const passwordCorrect = user === undefined ? false : await bcrypt.compare(body.password, user.passwordHash)
    if(!( user && passwordCorrect)){
        response.status(400).json({error: "invalid username or password"})
        return
    }
    
    response.status(200).json({ email: user.email, id: user.id, events: user.events })
})

module.exports =  loginRouter