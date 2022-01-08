import mongoose from 'mongoose';

const AlbumSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    artists: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: {
        type: Number,
        required: true,
        default: 0
    }
})

const Album = mongoose.model('Album', AlbumSchema);

export default Album;