import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReview } from '../actions';

const ReviewForm = () => {
    const [active, setActive] = useState(false);
    const [rating, setRating] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const user = useSelector(state => state.user);
    const reviews = useSelector(state => state.reviews);
    const dispatch = useDispatch();
    const params = useParams();

    const onSubmit = (e) => {
        e.preventDefault();
        if (!isNaN(rating) && parseFloat(rating) <= 5 && parseFloat(rating) >= 0) {
            dispatch(createReview({
                albumId: params.id,
                userId: user.id,
                userName: user.display_name,
                userImage: user.images.length ? user.images[0].url : null,
                title: title,
                body: body,
                rating: +parseFloat(rating).toFixed(2)
            }));
            setRating('');
            setTitle('');
            setBody('');
            setActive(false);
        }
    }

    return (
        <>
            {!user && (
                <h6 className='center'>Login to add reviews!</h6>
            )}
            {!active && user && reviews.every(review => review.userId !== user.id) && (
                <div className='center-align'>
                    <button className='btn waves-effect waves-light blue darken-2' onClick={() => setActive(true)}>Add a Review</button>
                </div>
            )}
            {active && user && (
                <div className='card-panel'>
                    <h5 className='center'>Add a Review</h5>
                    <form onSubmit={onSubmit}>
                        <div className='section'>
                            <div className='input-field'>
                                <i className='material-icons prefix'>star</i>
                                <input required placeholder='Rating (out of 5)' type='text' value={rating} onChange={(e) => setRating(e.target.value)}/>
                            </div>
                        </div>
                        <div className='section'>
                            <div className='input-field'>
                                <i className='material-icons prefix'>text_fields</i>
                                <input required placeholder='Title' type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
                            </div>
                        </div>
                        <div className='section'>
                            <div className='input-field'>
                                <i className='material-icons prefix'>subject</i>
                                <textarea required placeholder='Body' className='materialize-textarea' value={body} onChange={(e) => setBody(e.target.value)}/>
                            </div>
                        </div>
                        <div className='section center-align'>
                            <button type='submit' className='btn waves-effect waves-light blue darken-2'>Submit</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}

export default ReviewForm;