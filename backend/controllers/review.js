
const reviewRouter = require('express').Router()
const Review = require('../models/Review')
const User = require('../models/User')
const mongoose = require('mongoose')
const axios = require('axios')
const config = require('../utils/config')

reviewRouter.get( '/', async(req, res) => {
    const reviews = await Review.find({})
    res.status(200).json(reviews)
})

reviewRouter.get( '/:id', async(req, res) => {
    const id = req.params.id
    const review = await Review.findByID(id)
    res.status(200).json(review)
})

reviewRouter.post( '/', async( req, res) => { 
    const body = req.body
    const userID = body.userID
    const classID = body.classID

    if( !userID || !classID) {
        res.status(400).json({error: "No class ID or user ID found !"})
        return
    }

    if( typeof userID === "string" ) {
        userID = new mongoose.Types.ObjectId(supplierId)
    }

    if( typeof classID === "string" ) {
        classID = new mongoose.Types.ObjectId(supplierId)
    }

    const newReview = new Review({
        class: classID,
        professor: body.professor,
        comment: body.comment ? bocy.comment : "N/A",
        workload: body.workload,
        difficulty: body.difficulty,
        attendance: body.attendance,
        grade: body.grade ? body.grade : "N/A",
        user: userID
    })

    const savedReview = await newReview.save()
    res.status(200).json(savedReview)
})

reviewRouter.delete('/', async(request,response) => {
    await Review.deleteMany({})
    response.status(204).send("all reviews deleted")
})

reviewRouter.delete('/:id', async (request, response) => {
    await Review.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = reviewRouter
