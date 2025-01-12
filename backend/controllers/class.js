const classRouter = require('express').Router()
const Class = require('../models/Class')
const mongoose = require('mongoose')
const axios = require('axios')
const config = require('../utils/config')

classRouter.get( '/', async(req, res) => {
    const classes = await Class.find({})
    res.status(200).json(classes)
})

classRouter.get( '/:id', async(req, res) => {
    const id = req.params.id
    const cl = await Class.findById(id)
    res.status(200).json(cl)
})

classRouter.post( '/', async( req, res) => { 
    const body = req.body

    const newClass = new Class({
        name: body.name,
        department: body.department,
        professors: body.professors,
        reviews: [],
    })

    const savedClass = await newClass.save()
    res.status(200).json(savedClass)
})

classRouter.delete('/', async(request,response) => {
    await Class.deleteMany({})
    response.status(204).send("all classes deleted")
})

classRouter.delete('/:id', async (request, response) => {
    await Class.findByIdAndRemove(request.params.id)
    response.status(204).end()
})



module.exports = classRouter
