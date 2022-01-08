import axios from 'axios';
import qs from 'query-string';

const accountsUrl = 'https://accounts.spotify.com/api';
const apiUrl = 'https://api.spotify.com/v1';

export const getToken = async (req, res) => {
    try {
        const { data } = await axios({
            method: 'post',
            url: `${accountsUrl}/token`,
            data: qs.stringify({
                grant_type: 'authorization_code',
                code: req.headers.code,
                redirect_uri: process.env.REDIRECT_URI,
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET
            })
        });
        res.json({ token: data.access_token });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

export const getUser = async (req, res) => {
    try {
        const { data } = await axios({
            method: 'get',
            url: `${apiUrl}/me`,
            headers: {
                Authorization: `Bearer ${req.headers.token}`
            }
        });
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

export const searchAlbums = async (req, res) => {
    try {
        const { data } = await axios({
            method: 'get',
            url: `${apiUrl}/search`,
            headers: {
                Authorization: `Bearer ${req.headers.token}`
            },
            params: {
                q: req.query.query,
                type: 'album',
                limit: 4
            }
        });
        res.json(data.albums.items);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}