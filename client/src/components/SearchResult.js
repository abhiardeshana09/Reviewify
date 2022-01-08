import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchResult = ({ album }) => {
    const navigate = useNavigate();

    const getArtists = () => {
        let artists = "";
        for (let i = 0; i < album.artists.length; i++) {
            artists += i !== album.artists.length - 1 ? album.artists[i].name + ", " : album.artists[i].name;
        }
        return artists;
    }

    return (
        <div className='col s3'>
            <div className='card hoverable' onClick={() => navigate(`/album/${album.id}`)}>
                <div className='card-image'>
                    <img src={album.images[0].url} alt=''/>
                </div>
                <div className='card-content'>
                    <p className='truncate center'><b>{album.name}</b></p>
                    <p className='truncate center'>{getArtists()}</p>
                </div>
            </div>
        </div>
    )
}

export default SearchResult;