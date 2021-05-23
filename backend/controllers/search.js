const geniusAxios = require('../geniusAxios');
const select = require('../utils/select');

exports.getSearchResults = async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) throw new Error('No search query');

    const { data } = await geniusAxios.get('/search', {
      params: {
        q: query 
      }
    });

    // Data sanitization and filtering
    let responseData = data.response.hits.filter(el => el.type === 'song');
    responseData = responseData.map(el => ({ ...el.result }));
    responseData = responseData.map(el => select(
      el, 
      'song_art_image_thumbnail_url', 'id', 'primary_artist',
      'url', 'lyrics_state', 'title'
    ));

    responseData.forEach(el => {
      el.primary_artist = select(
        el.primary_artist,
        'id', 'name', 'url', 'image_url'
      );
    });

    res.status(200).json({
      status: 'success',
      body: responseData
    });
  } catch (err) {
    next(err);
  }
}