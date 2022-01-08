import express from 'express';
import { getReviews, createReview, deleteReview, editReview } from '../controllers/reviews.js';

const router = express.Router();

router.get('/getReviews/:albumId', getReviews);
router.post('/createReview', createReview);
router.delete('/deleteReview/:id', deleteReview);
router.put('/editReview/:id', editReview);

export default router;