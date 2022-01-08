import axios from 'axios';
import config from '../config';

const url = config.apiUrl;

export const getToken = (code) => axios({
    method: 'get',
    url: `${url}/spotify/getToken`,
    headers: {
        code: code
    }
});

export const getUser = (token) => axios({
    method: 'get',
    url: `${url}/spotify/getUser`,
    headers: {
        token: token
    }
});

export const getSearchResults = (token, query) => axios({
    method: 'get',
    url: `${url}/spotify/searchAlbums`,
    headers: {
        token: token
    },
    params: {
        query: query
    }
});

export const getAlbums = () => axios({
    method: 'get',
    url: `${url}/albums/getAlbums`
});

export const loadAlbum = (token, albumId) => axios({
    method: 'get',
    url: `${url}/albums/loadAlbum/${albumId}`,
    headers: {
        token: token
    }
});

export const getReviews = (albumId) => axios({
    method: 'get',
    url: `${url}/reviews/getReviews/${albumId}`
});

export const createReview = (newReview) => axios({
    method: 'post',
    url: `${url}/reviews/createReview`,
    data: newReview
});

export const deleteReview = (id) => axios({
    method: 'delete',
    url: `${url}/reviews/deleteReview/${id}`
});

export const editReview = (id, editedReview) => axios({
    method: 'put',
    url: `${url}/reviews/editReview/${id}`,
    data: editedReview
});