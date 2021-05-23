const fetchLyrics = require('../utils/fetchLyrics');
const fetchCachedLyrics = require('../utils/fetchCachedLyrics');
const geniusAxios = require('../geniusAxios');
const select = require('../utils/select');

exports.getSong = async (req, res, next) => {
  try {
    const unsanitizedSongId = encodeURIComponent(req.params.idWithText);
    const endIdRegex = /(\d+)(?!.*\d)/;
    const id = parseInt(unsanitizedSongId.match(endIdRegex)[0]);

    const { data: { response: { song } } } = await geniusAxios.get(`/songs/${id}`, {
      params: {
        text_format: 'plain'
      }
    });

    const { lyrics } = song.lyrics_state === 'complete' ?
      await fetchCachedLyrics(song.url) :
      await fetchLyrics(song.url);

    // Sanitization and filtering
    let responseData = select(
      song,
      'description', 'id', 'path', 'song_art_image_thumbnail_url', 
      'title', 'album', 'media', 'primary_artist'
    );
    responseData = {
      ...responseData,
      lyrics
    }

    res.status(200).json({
      status: 'success',
      data: responseData
    });
  } catch (err) {
    if (err.response && err.response.status === 404) {
      console.log(err.response);
      err.response = {
        ...err.response,
        toJSON() { return 'Song not found' },
      };
    }
    next(err);
  }
};