const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const newUserTokenSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // unique: true,
    },
    hashPassword: {
        type: String,
        required: true,
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600,// this is the expiry time in seconds
    },
})

module.exports = mongoose.model('NewUserToken', newUserTokenSchema)