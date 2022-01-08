import express from 'express';
import { getToken, getUser, searchAlbums } from '../controllers/spotify.js';

const router = express.Router();

router.get('/getToken', getToken);
router.get('/getUser', getUser);
router.get('/searchAlbums', searchAlbums);

export default router;