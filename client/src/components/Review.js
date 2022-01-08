import React from 'react';
import { Box, Rating } from '@mui/material';
import moment from 'moment';
import defaultPfp from '../images/default_pfp.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview } from '../actions';

const Review = ({ review }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    return (
        <div className='section'>
            <div className='card'>
                <div className='card-content'>
                    <div className='row'>
                        <div className='col s6'>
                            <img src={review.userImage ? review.userImage : defaultPfp} className='circle left' style={{ objectFit: 'cover', width: '35px', height: '35px', marginRight: '10px'}} alt=''/>
                            <p style={{ marginTop: '7px' }}><b>{review.userName ? review.userName : review.userId}</b></p>
                        </div>
                        {user?.id === review.userId && (
                            <div className='col s6'>
                                <button className='btn-small waves-effect waves-light blue darken-2 right' onClick={() => dispatch(deleteReview(review._id))}>
                                    <i className='material-icons'>delete</i>
                                </button>
                            </div>
                        )}
                    </div>  
                    <div style={{ marginBottom: '10px' }} className='divider'/>
                    <Box display='flex' alignItems='center'>
                        <Rating readOnly value={review.rating}/>
                        <p style={{ marginLeft: '5px' }}><big><b>{+review.rating.toFixed(2) + '/5'}</b></big></p>
                    </Box>
                    <p style={{ marginTop: '5px' }}><big><b>{review.title}</b></big></p>
                    <p>{review.body}</p>
                    <div className='right-align'>
                        <p className='grey-text'>{moment(review.date).fromNow()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review;