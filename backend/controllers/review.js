const reviewRouter = require('express').Router()
const Review = require('../models/Review')
const Class = require('../models/Class')
const User = require('../models/User')
const mongoose = require('mongoose')
const axios = require('axios')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const Professor = require('../models/Professor')
const {adminAuth} = require('../utils/middlewares')
reviewRouter.get( '/', async(req, res) => {
    const reviews = await Review.find({}).select('-user')
    res.status(200).json(reviews)
})

reviewRouter.get( '/:id', async(req, res) => {
    const id = req.params.id
    const review = await Review.findById(id).select('-user')
    res.status(200).json(review)
})

reviewRouter.post( '/', async( req, res) => { 
    const body = req.body
    const decodedToken = await jwt.verify(req.token, config.SECRET )
    let classID = body.class
    let professorID = body.professor

    if(!decodedToken){
        return response.status(400).json({error: "Invalid Token"})
    }

    if( !classID || !professorID) {
        res.status(400).json({error: "No class ID or Professor ID found!"})
        return
    }

    if( typeof classID === "string" ) {
        classID = new mongoose.Types.ObjectId(classID)
    }
    
    if( typeof professorID === "string" ){
        professorID = new mongoose.Types.ObjectId(professorID)
    }

    const user = await User.findById(decodedToken.id)


    if( !user ) {
        throw new Error( "Invalid User ID")
    }

    const foundClass = await Class.findById(classID)
    if( !foundClass ){
        throw new Error( "Invalid Class ID")
    }
    const foundProfessor = await Professor.findById(professorID)
    if( !foundProfessor ){
        throw new Error( "Invalid Professor ID")
    }

    const newReview = new Review({
        class: classID,
        professor: professorID,
        comment: body.comment ? body.comment : "N/A",
        workload: body.workload,
        difficulty: body.difficulty,
        attendance: body.attendance,
        grade: body.grade ? body.grade : "N/A",
        user: user.id,
        term: body.term,
        year: body.year,
    })

    const savedReview = await newReview.save()

    // Update the user's reviews
    user.reviews.push(savedReview._id)
    await user.save()

    // Update class's reviews
    foundClass.reviews.push(savedReview._id)
    await foundClass.save()

    // Update the professor's reviews
    foundProfessor.reviews.push(savedReview._id)
    await foundProfessor.save()

    res.status(200).json(savedReview)
})

reviewRouter.delete('/', adminAuth, async(request,response) => {
    await Review.deleteMany({})
    response.status(204).send("all reviews deleted")
})

reviewRouter.delete('/:id', async (request, response) => {
    const reviewId = request.params.id
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if( !decodedToken ){
        return response(400).json({error: "Invalid Token"})
    }
    const tokenUser = await User.findById(decodedToken.id)
    const review = await Review.findById(reviewId)
    const cl = await Class.findById(review.class)
    const professor = await Professor.findById(review.professor)

    if(!cl || !professor){
        console.log("No class or professor valid")
        return response.status(400).json({error: "invalid class or professor"})
    }

    if(review.user.toString() === tokenUser._id.toString()){
        const newReview = await Review.findByIdAndDelete(reviewId)
        tokenUser.reviews = tokenUser.reviews.filter(
            id => id.toString() !== reviewId
        )

        cl.reviews = cl.reviews.filter(
            id => id.toString() !== reviewId
        )

        professor.reviews = professor.reviews.filter(
            id => id.toString() !== reviewId
        )
        
        await tokenUser.save()
        await cl.save()
        await professor.save()

        response.status(204).json(newReview)
    }
    else{
        response.status(400).json({error: `invalid User`})
    }
})

module.exports = reviewRouter
