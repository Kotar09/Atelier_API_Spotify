
const express = require('express');
const app = express();
const artistRoutes = require('./routes/artists.route');
const albumRoutes = require('./routes/albums.route');
const playlistRoutes = require('./routes/playlists.route');
const trackRoutes = require('./routes/tracks.route');
const playlistContientTrackRoutes = require('./routes/playlist_contient_track.route');

app.use(express.json());

app.use('/api/v1', artistRoutes);
app.use('/api/v1', albumRoutes);
app.use('/api/v1', playlistRoutes);
app.use('/api/v1', trackRoutes);
app.use('/api/v1', playlistContientTrackRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}.`);
});
