const reviewRouter = require('express').Router()
const Review = require('../models/Review')
const Class = require('../models/Class')
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
    const review = await Review.findById(id)
    res.status(200).json(review)
})

reviewRouter.post( '/', async( req, res) => { 
    const body = req.body
    let userID = body.user
    let classID = body.class

    if( !userID || !classID) {
        res.status(400).json({error: "No class ID or user ID found !"})
        return
    }

    if( typeof userID === "string" ) {
        userID = new mongoose.Types.ObjectId(userID)
    }

    if( typeof classID === "string" ) {
        classID = new mongoose.Types.ObjectId(classID)
    }

    const user = await User.findById(userID)
    if( !user ) {
        throw new Error( "Invalid User ID")
    }

    const foundClass = await Class.findById(classID)
    if( !foundClass ){
        throw new Error( "Invalid Class ID")
    }

    const newReview = new Review({
        class: classID,
        professor: body.professor,
        comment: body.comment ? body.comment : "N/A",
        workload: body.workload,
        difficulty: body.difficulty,
        attendance: body.attendance,
        grade: body.grade ? body.grade : "N/A",
        user: userID,
        term: body.term,
        year: body.year
    })

    const savedReview = await newReview.save()

    // Update the user's reviews
    user.reviews.push(savedReview._id)
    await user.save()

    // Update class's reviews
    foundClass.reviews.push(savedReview._id)
    await foundClass.save()

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
