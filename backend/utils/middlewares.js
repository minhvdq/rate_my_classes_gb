const logger = require('./logger')
const jwt = require('jsonwebtoken')
const config = require('./config')
const User = require('../models/User')

const requestLogger = (request, response, next) => {
  logger.infor('Method:', request.method)
  logger.infor('Path:  ', request.path)
  logger.infor('Body:  ', request.body)
  logger.infor('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  else if( error.name === 'JsonWebTokenError'){
    return response.status(400).json({error: error.message})
  }
  else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)

}

const tokenExtractor = async ( request, response, next) => {
  const autho = request.get('authorization')
  if(autho && autho.startsWith('Bearer ')){
    console.log(autho)
    request.token = autho.replace('Bearer ', '')
  }
  next()

}

const adminAuth = async (request, response, next) => {
  const autho = request.get('authorization')
  if (!autho || !autho.startsWith('Bearer ')) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const token = autho.replace('Bearer ', '')
  try {
    const decodedToken = jwt.verify(token, config.SECRET)
    const user = await User.findById(decodedToken.id)
    
    if (!user || !user.isAdmin) {
      return response.status(403).json({ error: 'admin access required' })
    }
    
    request.user = user
    next()
  } catch (error) {
    return response.status(401).json({ error: 'token invalid' })
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  adminAuth
}