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

classRouter.put('/:id', async( req, res) => {
    const id = req.params.id
    const body = req.body
    const curClass = await Class.findById(id)
    const fixingClass = {
        name: body.name ? body.name : curClass.name,
        reviews : body.reviews ? body.reviews : curClass.reviews,
        department: body.department ? body.department : curClass.department
    }
    const updateClass = await Class.findByIdAndUpdate(id, fixingClass, {new: true})

    res.status(201).json(updateClass)
})

classRouter.post( '/', async( req, res) => { 
    const body = req.body

    const newClass = new Class({
        name: body.name,
        department: body.department,
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
    await Class.findByIdAndDelete(request.params.id)
    response.status(204).end()
})



module.exports = classRouter
