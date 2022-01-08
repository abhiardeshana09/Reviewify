import { GET_REVIEWS, UNLOAD_REVIEWS, CREATE_REVIEW, DELETE_REVIEW } from '../constants/actionTypes';

const reducer = (reviews = [], action) => {
    switch(action.type) {
        case GET_REVIEWS:
            return action.payload.reverse();
        case UNLOAD_REVIEWS:
            return [];
        case CREATE_REVIEW:
            return [action.payload.newReview, ...reviews];
        case DELETE_REVIEW:
            return reviews.filter(review => review._id !== action.payload.id);
        default:
            return reviews;
    }
}

export default reducer;