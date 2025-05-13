const classRouter = require('express').Router()
const Class = require('../models/Class')
const mongoose = require('mongoose')
const axios = require('axios')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { adminAuth } = require('../utils/middlewares')

classRouter.get( '/', async(req, res) => {
    const classes = await Class.find({})
    res.status(200).json(classes)
})

classRouter.get( '/:id', async(req, res) => {
    const id = req.params.id
    const cl = await Class.findById(id)
    res.status(200).json(cl)
})

classRouter.put('/:id', adminAuth, async( req, res) => {
    const id = req.params.id
    const body = req.body   
    const decodedToken = await jwt.verify(req.token, config.SECRET )

    if(!decodedToken){
        return response.status(400).json({error: "Invalid Token"})
    }

    let userId = decodedToken.id
    const user = await User.findById(userId)

    
    const curClass = await Class.findById(id)
    const fixingClass = {
        name: body.name ? body.name : curClass.name,
        reviews : body.reviews ? body.reviews : curClass.reviews,
        department: body.department ? body.department : curClass.department
    }
    const updateClass = await Class.findByIdAndUpdate(id, fixingClass, {new: true})

    res.status(201).json(updateClass)
})

classRouter.post('/', adminAuth, async (request, response) => {
    const body = request.body
    const newClass = new Class({
        name: body.name,
        department: body.department,
        reviews: []
    })
    const savedClass = await newClass.save()
    response.status(201).json(savedClass)
})

classRouter.delete('/', adminAuth, async(request,response) => {
    await Class.deleteMany({})
    response.status(204).send("all classes deleted")
})

classRouter.delete('/:id', adminAuth, async (request, response) => {
    await Class.findByIdAndDelete(request.params.id)
    response.status(204).end()
})



module.exports = classRouter
