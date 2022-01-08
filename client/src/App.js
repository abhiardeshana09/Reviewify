import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from './actions';
import Home from './components/Home';
import Auth from './components/Auth';
import AlbumPage from './components/AlbumPage';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/auth' element={<Auth/>}/>
                <Route path='/album/:id' element={<AlbumPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;