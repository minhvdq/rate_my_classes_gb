const userRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const saltRounds = 10
const authService = require('../services/auth.service')
// const sendEmail = require('../utils/email/sendEmail')

/**
 * Fetch all users from database
 */
userRouter.get('/', async (request, response) => {
    console.log("getting")
    const users = await User.find({})
    console.log(users)
    response.status(200).json(users)
})

/**
 * Fetch user by ID
 */
userRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id)
    response.status(200).json(user)
})

/**
 * Delete all users in database
 */
userRouter.delete('/', async (request, response) => {
    await User.deleteMany({})
    response.status(204).send("All users deleted").end()
})

/**
 * Add new user to the database
 */
userRouter.post('/', async (request, response) => {
    const body = request.body

    // Cheking if user already existed
    let user = await User.findOne({email: body.email})
    if( user ){
        console.log(user)
        throw new Error( "User already existed" )
    }
    const salt = await bcrypt.genSalt(saltRounds)
    const hashPassword = await bcrypt.hash(body.password, salt)

    authService.requestNewUser({name:body.name, email: body.email, hashPassword})

    response.status(201).json({message: "Verification link sent!"})
})

/**
 * Delete user by id
 */
userRouter.delete('/:id', async(request, response) => {
    const userId = request.params.id
    const user = await User.findById(userId)
    await User.findByIdAndDelete(userId)
    response.status(204).json(user)
})

/**
 * Modify user by id
 */
userRouter.put('/:id', async( request, response) => {
    const userId = request.params.id
    const body = request.body
    const currentUser = await User.findById(userId)
    const salt = await bcrypt.genSalt(saltRounds)
    const newPasswordHash = body.password ? await bcrypt.hash(body.password, salt) : null
    const fixingUser = {
        name: body.name ? body.name : currentUser.name,
        email: body.email ? body.email : currentUser.email,
        // phoneNumber: body.phoneNumber ? body.phoneNumber : currentUser.phoneNumber,
        passwordHash : body.password ? newPasswordHash : currentUser.passwordHash,
        events: body.events ? body.events : currentUser.events
    }
    const updateUser = await User.findByIdAndUpdate(userId, fixingUser, {new: true})

    response.json(updateUser)
})

module.exports = userRouter