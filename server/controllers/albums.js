import axios from 'axios';
import Album from '../models/album.js';

const apiUrl = 'https://api.spotify.com/v1';

export const getAlbums = async (req, res) => {
    try {
        const albums = await Album.find();
        const reviewedAlbums = albums.filter(album => album.reviews > 0);
        res.json(reviewedAlbums);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

export const loadAlbum = async (req, res) => {
    try {
        const album = await Album.findById(req.params.albumId);
        if (!album) {
            const { data } = await axios({
                method: 'get',
                url: `${apiUrl}/albums/${req.params.albumId}`,
                headers: {
                    Authorization: `Bearer ${req.headers.token}`
                }
            });
            let artists = "";
            for (let i = 0; i < data.artists.length; i++) {
                artists += i !== data.artists.length - 1 ? data.artists[i].name + ", " : data.artists[i].name;
            }
            const _id = data.id;
            const name = data.name;
            const image = data.images[0].url;
            const year = data.release_date.slice(0, 4);
            const newAlbum = new Album({ _id, name, artists, image, year });
            await newAlbum.save();
            res.json(newAlbum);
        } else {
            res.json(album);
        }
    } catch (error) {
        res.status(400).json({ error: error });
    }
}