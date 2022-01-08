import mongoose from 'mongoose';

const ReviewSchema = mongoose.Schema({
    albumId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String
    },
    userImage: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const Review = mongoose.model('Review', ReviewSchema);

export default Review;