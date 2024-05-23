
const express = require('express');
const app = express();
const artistRoutes = require('./routes/artists.route');
const albumRoutes = require('./routes/albums.route');
const playlistRoutes = require('./routes/playlists.route');
const trackRoutes = require('./routes/tracks.route');
const playlistContientTrackRoutes = require('./routes/playlist_contient_track.route');

app.use(express.json());

app.use('/api', artistRoutes);
app.use('/api', albumRoutes);
app.use('/api', playlistRoutes);
app.use('/api', trackRoutes);
app.use('/api', playlistContientTrackRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}.`);
});
