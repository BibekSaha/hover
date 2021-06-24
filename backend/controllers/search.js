const geniusAxios = require('../geniusAxios');
const select = require('../utils/select');
const constructSearchURI = require('../utils/constructSearchUri');

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
    responseData = responseData.map(el => ({ 
      ...el.result,
      // Add the slug and the path to the final response
      slug: constructSearchURI(el.result.title, el.result.id),
      path: `${
        req.baseUrl.replace('search', 'songs')
      }/${
        constructSearchURI(el.result.title, el.result.id)
      }` 
    }));

    responseData = responseData.map(el => select(
      el, 
      'song_art_image_thumbnail_url', 'id', 'primary_artist',
      'title', 
      'slug', 'path',
      // 'url', 'lyrics_state'
    ));

    responseData.forEach(el => {
      el.primary_artist = select(
        el.primary_artist,
        'id', 'name', 'url', 'image_url'
      );
    });

    res.status(200).json({
      status: 'success',
      data: responseData
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}