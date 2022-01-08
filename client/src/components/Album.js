import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rating, Box } from '@mui/material';

const Album = ({ album, col, cardStyle }) => {
    const navigate = useNavigate();

    return (
        <div className={col}>
            <div className={cardStyle} onClick={() => navigate(`/album/${album._id}`)}>
                <div className='card-image'>
                    <img src={album.image} alt=''/>
                </div>
                <div className='card-content'>
                    <p className='truncate'><big><b>{album.name}</b></big></p>
                    <p className='truncate'>{album.artists}</p>
                    <p className='truncate grey-text'>{album.year}</p>
                    <Box display='flex' alignItems='center'>
                        <Rating readOnly value={album.rating}/>
                        <p style={{ marginLeft: '5px' }}><big><b>{+album.rating.toFixed(2) + '/5'}</b></big></p>
                    </Box>
                    <p className='truncate'>{album.reviews + (album.reviews !== 1 ? ' reviews' : ' review')}</p>
                </div>
            </div>
        </div>
    )
}

export default Album;