const professorRouter = require('express').Router()
const Professor = require('../models/Professor')
const mongoose = require('mongoose')
const axios = require('axios')
const config = require('../utils/config')
const {adminAuth} = require('../utils/middlewares')

professorRouter.get( '/', async(req, res) => {
    const classes = await Professor.find({})
    res.status(200).json(classes)
})

professorRouter.get( '/:id', async(req, res) => {
    const id = req.params.id
    const cl = await Professor.findById(id)
    res.status(200).json(cl)
})

professorRouter.get('/byDepartment/:department', async(req, res) => {
    const department = req.params.department
    const professors = await Professor.find({department: department})
    res.status(200).json(professors)
})

professorRouter.put('/:id', adminAuth, async( req, res) => {
    const id = req.params.id
    const body = req.body
    const curProfessor = await Professor.findById(id)
    const fixingProfessor = {
        name: body.name ? body.name : curClass.name,
        reviews : body.reviews ? body.reviews : curClass.reviews,
        department: body.department ? body.department : curClass.department
    }
    const updateProfessor = await Professor.findByIdAndUpdate(id, fixingProfessor, {new: true})

    res.status(201).json(updateProfessor)
})

professorRouter.post( '/', adminAuth, async( req, res) => { 
    const body = req.body

    const newProfessor = new Professor({
        name: body.name,
        department: body.department,
        reviews: [],
    })

    const savedProfessor = await newProfessor.save() 
    res.status(201).json(savedProfessor)
})

professorRouter.delete('/', adminAuth, async(request,response) => {
    await Professor.deleteMany({})
    response.status(204).send("all professors deleted")
})

professorRouter.delete('/:id', adminAuth, async (request, response) => {
    await Professor.findByIdAndDelete(request.params.id)
    response.status(204).end()
})



module.exports = professorRouter
