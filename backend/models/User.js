const mongoose = require( "mongoose" )

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    email:{
        type: String,
        required: true,
        unique: true,
    },
    passwordHash:{
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    reviews:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

mongoose.set('toJSON', {
    transform: (doc,ret)=> {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})


module.exports = mongoose.model('User', userSchema)