import { GET_USER, LOGOUT_USER, LOAD_ALBUM, UNLOAD_ALBUM, GET_REVIEWS, UNLOAD_REVIEWS, CREATE_REVIEW, DELETE_REVIEW } from '../constants/actionTypes';
import * as api from '../api';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const login = (code) => async (dispatch, getState) => {
    try {
        const { data } = await api.getToken(code);
        cookies.set('token', data.token, { path: '/', maxAge: 3600 });
        dispatch(getUser());
    } catch (error) {
        console.log(error);
    }
}

export const getUser = () => async (dispatch, getState) => {
    try {
        const { user } = getState();
        if (!user) {
            const token = cookies.get('token');
            if (token) {
                const { data } = await api.getUser(token);
                dispatch({ type: GET_USER, payload: data });
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const logout = () => {
    cookies.remove('token');
    return { type: LOGOUT_USER }
}

export const loadAlbum = (albumId) => async (dispatch, getState) => {
    try {
        const { data } = await api.loadAlbum(cookies.get('token'), albumId);
        dispatch({ type: LOAD_ALBUM, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const unloadAlbum = () => {
    return { type: UNLOAD_ALBUM }
}

export const getReviews = (albumId) => async (dispatch, getState) => {
    try {
        const { data } = await api.getReviews(albumId);
        dispatch({ type: GET_REVIEWS, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const unloadReviews = () => {
    return { type: UNLOAD_REVIEWS }
}

export const createReview = (newReview) => async (dispatch, getState) => {
    try {
        const { data } = await api.createReview(newReview);
        dispatch({ type: CREATE_REVIEW, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteReview = (id) => async (dispatch, getState) => {
    try {
        const { data } = await api.deleteReview(id);
        dispatch({ type: DELETE_REVIEW, payload: { ...data, id } });
    } catch (error) {
        console.log(error);
    }
}