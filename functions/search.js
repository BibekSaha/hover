const fetch = require('node-fetch');

const GENIUS_BASE_URI = 'https://api.genius.com';
const GENIUS_BASE_SEARCH_URI = GENIUS_BASE_URI + `/search?access_token=${process.env.REACT_APP_GENIUS_TOKEN}&q=`;
const LYRICS_BASE_URL = `https://api.lyrics.ovh/v1`;
const GENIUS_AUTH_HEADERS = {
  Authorization: `Bearer ${process.env.REACT_APP_GENIUS_TOKEN}`
};

let GENIUS_SONG_DETAILS_URI;

const search = (song) => {
  const GENIUS_SEARCH_URI = GENIUS_BASE_SEARCH_URI + song;
  const cache = {
    fullTitle: '',
    artistName: '',
    imageURL: '',
    audioPreviewURL: '',
    lyrics: '',
  };

  return fetch(GENIUS_SEARCH_URI, GENIUS_AUTH_HEADERS)
    .then(resp => resp.json())
    .then(resp => resp.response.hits[0].result)
    .then(songDataResp => {
      cache.fullTitle = songDataResp.title;
      cache.artistName = songDataResp.primary_artist.name;
      cache.imageURL = songDataResp.song_art_image_thumbnail_url;

      const songAPIpath = songDataResp.api_path;
      GENIUS_SONG_DETAILS_URI = GENIUS_BASE_URI + `${songAPIpath}?access_token=${process.env.REACT_APP_GENIUS_TOKEN}&text_format=plain`;

      return fetch(GENIUS_SONG_DETAILS_URI, GENIUS_AUTH_HEADERS);
    })
    .then(resp => resp.json())
    .then(resp => resp.response.song.media)
    .then(songMediaData => {
      const youTubeObject = songMediaData.find(mediaObj => mediaObj.provider === 'youtube');
      cache.audioPreviewURL = youTubeObject.url;

      // sanitizing the title and the artist name
      const artist = cache.artistName.split('&')[0].trim();
      const title = decodeURI(cache.fullTitle.trim());
      return fetch(`${LYRICS_BASE_URL}/${artist}/${title}`);
    })
    .then(resp => resp.json())
    .then(resp => {
      if (resp.error || !resp.lyrics) {
        if (!cache.audioPreviewURL) return Promise.reject({errorMessage: 'Not Found'});
        cache.lyrics = '';
      } else {
        cache.lyrics = resp.lyrics;
      }
      return cache;
    })
    .catch(() => Promise.reject({errorMessage: 'Not Found'}));
};

exports.handler = async function (event, context) {
  if (event.httpMethod === 'GET') {
    const songUserTitle = event.queryStringParameters.q;
    try {
      const response = await search(songUserTitle);
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      };
    } catch (err) {
      return {
        statusCode: 404,
        body: JSON.stringify(err)
      };
    }
  }
}