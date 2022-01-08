import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions';
import config from '../config';
import qs from 'query-string';
import defaultPfp from '../images/default_pfp.jpg';

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const url = 'https://accounts.spotify.com/authorize?' + qs.stringify({
        client_id: config.clientId,
        response_type: 'code',
        redirect_uri: config.redirectUri,
        scope: 'user-read-private user-read-email'
    });

    return (
        <nav>
            <div className='nav-wrapper light-blue'>
                <Link to='/' className='brand-logo center'><b>Reviewify</b></Link>
                {user && (
                    <ul className='left'>
                        <li>
                            <a>
                                <img src={user.images.length ? user.images[0].url : defaultPfp} className='circle left' style={{ objectFit: 'cover', width: '45px', height: '45px', marginTop: '10px', marginRight: '10px' }} alt=''/>
                                <b>{user.display_name ? user.display_name : user.id}</b>
                            </a>
                        </li>
                    </ul>
                )}
                <ul className='right'>
                    <li>
                        {user && (
                            <a onClick={() => dispatch(logout())} className='btn waves-effect waves-light blue darken-2'>
                                Logout
                            </a>
                        )}
                        {!user && (
                            <a href={url} className='btn waves-effect waves-light blue darken-2'>
                                Login with Spotify
                            </a>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;