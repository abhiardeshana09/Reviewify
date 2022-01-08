import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getSearchResults } from '../api';
import Cookies from 'universal-cookie';
import SearchResult from './SearchResult';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [timer, setTimer] = useState(null);
    const user = useSelector(state => state.user);
    const cookies = new Cookies();

    const onChangeSearchQuery = (e) => {
        setSearchQuery(e.target.value);
        if (timer) {
            clearTimeout(timer);
        }
        setTimer(setTimeout(async () => {
            try {
                if (e.target.value.length > 0) {
                    const { data } = await getSearchResults(cookies.get('token'), e.target.value);
                    setSearchResults(data);
                } else {
                    setSearchResults([]);
                }
            } catch (error) {
                console.log(error);
            }
        }, 250));
    }

    return (
        <>
            <div className='section'>
                <div className='row'>
                    <div className='col s4 offset-s4 input-field'>
                        <i className='material-icons prefix'>search</i>
                        {user ? (
                            <input placeholder='Search for an album...' type='text' value={searchQuery} onChange={onChangeSearchQuery}/>
                        ) : (
                            <input disabled value='Login to search for new, unreviewed albums!'/>
                        )}
                    </div>
                </div>
            </div>
            {user && searchResults.length > 0 && (
                <div className='row'>
                    <div className='col s6 offset-s3'>
                        <div className='row'>
                            {searchResults.map(result => (
                                <SearchResult album={result} key={result.id}/>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <div className='divider'/>
        </>
    )
}

export default Search;