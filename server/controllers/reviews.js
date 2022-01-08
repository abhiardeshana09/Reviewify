import Review from '../models/review.js';
import Album from '../models/album.js';

export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ albumId: req.params.albumId });
        res.json(reviews);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

const updateAlbumData = async (albumId) => {
    const reviews = await Review.find({ albumId: albumId });
    if (reviews.length) {
        let ratingSum = 0;
        reviews.forEach(review => {
            ratingSum += review.rating;
        });
        const updatedAlbum = await Album.findByIdAndUpdate(albumId, {
            rating: ratingSum / reviews.length,
            reviews: reviews.length
        }, { new: true });
        return updatedAlbum;
    } else {
        const updatedAlbum = await Album.findByIdAndUpdate(albumId, {
            rating: 0,
            reviews: 0
        }, { new: true });
        return updatedAlbum;
    }
}

export const createReview = async (req, res) => {
    try {
        const { albumId, userId, userName, userImage, title, body, rating } = req.body;
        const newReview = new Review({ albumId, userId, userName, userImage, title, body, rating });
        await newReview.save();
        const updatedAlbum = await updateAlbumData(albumId);
        res.json({ updatedAlbum: updatedAlbum, newReview: newReview });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

export const deleteReview = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedReview = await Review.findByIdAndRemove(id);
        const updatedAlbum = await updateAlbumData(deletedReview.albumId);
        res.json({ updatedAlbum: updatedAlbum });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

export const editReview = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, body, rating } = req.body;
        const updatedReview = await Review.findByIdAndUpdate(id, { title, body, rating }, { new: true });
        const updatedAlbum = await updateAlbumData(updatedReview.albumId);
        res.json({ updatedAlbum: updatedAlbum, updatedReview: updatedReview });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}