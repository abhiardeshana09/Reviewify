import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadAlbum, unloadAlbum, getReviews, unloadReviews } from '../actions';
import Navbar from './Navbar';
import Album from './Album';
import Review from './Review';
import ReviewForm from './ReviewForm';

const AlbumPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const album = useSelector(state => state.album);
    const reviews = useSelector(state => state.reviews);

    useEffect(() => {
        dispatch(loadAlbum(params.id));
        dispatch(getReviews(params.id));
        return () => {
            dispatch(unloadAlbum());
            dispatch(unloadReviews());
        }
    }, [])

    return (
        <>
            <Navbar/>
            {album && (
                <div className='row'>
                    <div className='col s6 offset-s3'>
                        <div className='row'>
                            <Album album={album} col='col s6 offset-s3' cardStyle='card'/>
                        </div>
                        <ReviewForm/>
                        {reviews.map(review => (
                            <Review review={review} key={review._id}/>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default AlbumPage;