const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    class: {
        type: mongoose.Types.ObjectId,
        ref: 'Class',
    }, 
    professor: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    workload: { // Fixed typo
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
});

mongoose.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    },
});

module.exports = mongoose.model('Review', reviewSchema);
