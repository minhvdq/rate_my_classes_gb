const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
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

module.exports = mongoose.model('Professor', professorSchema);
