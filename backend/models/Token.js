const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const tokenSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
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

module.exports = mongoose.model('Token', tokenSchema)