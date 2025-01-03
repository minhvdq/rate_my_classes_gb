const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    professors: [
        {
            type: String,
        },
    ],
    reviews: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Review',
        },
    ],
});

mongoose.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    },
});

module.exports = mongoose.model('Class', classSchema);
