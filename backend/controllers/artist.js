const select = require('../utils/select');
const geniusAxios = require('../geniusAxios');
const constructSearchURI = require('../utils/constructSearchUri');

exports.getArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data: { response: data } } = await geniusAxios.get(`/artists/${id}`, {
      params: {
        text_format: 'plain'
      }
    });


    const responseObject = select(
      data.artist,
      'alternate_names', 'description', 'facebook_name',
      'header_image_url', 'image_url', 'instagram_name',
      'name', 'twitter_name'
    );

    res.status(200).json({
      status: 'success',
      data: responseObject
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

exports.getArtistSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    let { data: { response: { songs } } } = await geniusAxios(`/artists/${id}/songs`, {
      params: {
        sort: 'popularity',
        per_page: 10,
        page
      },
    });

    songs = songs.map(song => ({
      ...select(
        song,
        'full_title', 'id', 'title',
        'song_art_image_thumbnail_url',
      ),
      slug: constructSearchURI(song.title, song.id),
      path: `${
        req.baseUrl.replace('artists', 'songs')
      }/${
        constructSearchURI(song.title, song.id)
      }`
    }));
  
    res.status(200).json({
      status: 'success',
      data: songs
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};