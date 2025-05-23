const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    class: {
        type: mongoose.Types.ObjectId,
        ref: 'Class',
    }, 
    professor: {
        type: mongoose.Types.ObjectId,
        ref: 'Professor',
    },
    comment: {
        type: String,
        required: true,
    },
    workload: { 
        type: Number,
        required: true,
    },
    difficulty: {
        type: Number,
        required: true,
    },
    attendance: {
        type: Boolean,
        required: true,
    },
    grade: {
        type: String,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    term: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    postBy: {
        type: Date,
        default: Date.now
    }
});

mongoose.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.user;
    },
});

module.exports = mongoose.model('Review', reviewSchema);
