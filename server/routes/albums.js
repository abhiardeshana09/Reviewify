import express from 'express';
import { getAlbums, loadAlbum } from '../controllers/albums.js';

const router = express.Router();

router.get('/getAlbums', getAlbums);
router.get('/loadAlbum/:albumId', loadAlbum);

export default router;