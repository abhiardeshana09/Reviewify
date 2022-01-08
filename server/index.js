import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import spotifyRoutes from './routes/spotify.js';
import reviewRoutes from './routes/reviews.js';
import albumRoutes from './routes/albums.js';

dotenv.config();
const app = express();

app.use(express.json({ limit: '32mb', extended: true }));
app.use(express.urlencoded({ limit: '32mb', extended: true }));
app.use(cors());

app.use('/spotify', spotifyRoutes);
app.use('/reviews', reviewRoutes);
app.use('/albums', albumRoutes);

app.get('/', (req, res) => {
    res.send('This is the Reviewify API');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(error => console.log(error));