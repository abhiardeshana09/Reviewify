import React, { useState, useEffect } from 'react';
import { getAlbums } from '../api';
import Navbar from './Navbar';
import Search from './Search';
import Album from './Album';

const Home = () => {
    const [albums, setAlbums] = useState([]);

    const loadAlbums = async () => {
        try {
            const { data } = await getAlbums();
            setAlbums(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadAlbums();
    }, [])

    return (
        <>
            <Navbar/>
            <Search/>
            <div className='row'>
                <div className='col s10 offset-s1'>
                    <div className='row'>
                        {albums.map(album => (
                            <Album album={album} col='col s3' cardStyle='card hoverable' key={album._id}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;