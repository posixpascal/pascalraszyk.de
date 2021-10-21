const spotify = require('./lib/spotify').spotifyAPI;

spotify.getCurrentTrack().then(t => {
  console.log(t);
})
