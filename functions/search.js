const fetch = require("node-fetch");
const cheerio = require("cheerio");

const fetchLyrics = async url => {
  try {
    const htmlResp = await fetch(url);
    const html = await htmlResp.text();
    const $ = cheerio.load(html);
  
    console.log(url);
    
    const className = html.indexOf('Lyrics__Container-sc-1ynbvzw-6') !== -1 ? 'Lyrics__Container-sc-1ynbvzw-6': 
    'lyrics';

    console.log(className);

    // If the classname is simple one
    // then no need to do the extra shenanigans
    if (className === 'lyrics')
      return JSON.stringify({
        lyrics: $('div.lyrics').text().trim()
      });
    
    // const lyricsContainer = html.match(/(Lyrics__Container).*/);
  
    // if (lyricsContainer) {
    //   const [classNameUnsanitized] = lyricsContainer;
    //   sanitizedIndex = classNameUnsanitized.indexOf('"');
    //   className = classNameUnsanitized.substring(0, sanitizedIndex);
    // }

    let lyrics = [];

    // Push all the div that contains the classname into lyrics as html
    $(`div.${className}`)
      .each(
        (i, e) => lyrics.push(cheerio.load(e).html())
      );

    // Replace the <br> with \n of each element of lyrics
    lyrics = lyrics.map(el => {
      el = el.replace(/\<br\>/g, '\n');
      return cheerio.load(el).text().trim();
    });

    // Join each element with a new line 
    lyrics = lyrics.join('\n');

    return JSON.stringify({ lyrics });

    // const responseObject = JSON.stringify({ 
    //   lyrics: $(`.${className}`, html).text().trim() 
    // });
  
    // return responseObject;
  } catch (err) {
    console.error(err);
  }
};

const GENIUS_BASE_URI = "https://api.genius.com";
const GENIUS_BASE_SEARCH_URI =
  GENIUS_BASE_URI +
  `/search?access_token=${process.env.REACT_APP_GENIUS_TOKEN}&q=`;
const GENIUS_AUTH_HEADERS = {
  Authorization: `Bearer ${process.env.REACT_APP_GENIUS_TOKEN}`,
};

let GENIUS_SONG_DETAILS_URI, GENIUS_LYRICS_URI;

const search = (song) => {
  const GENIUS_SEARCH_URI = GENIUS_BASE_SEARCH_URI + encodeURIComponent(song);
  const cache = {
    fullTitle: "",
    artistName: "",
    imageURL: "",
    audioPreviewURL: "",
    lyrics: "",
  };

  return fetch(GENIUS_SEARCH_URI, GENIUS_AUTH_HEADERS)
    .then((resp) => resp.json())
    .then((resp) => resp.response.hits[0].result)
    .then((songDataResp) => {
      cache.fullTitle = songDataResp.title;
      cache.artistName = songDataResp.primary_artist.name;
      cache.imageURL = songDataResp.song_art_image_thumbnail_url;
      GENIUS_LYRICS_URI = songDataResp.url;

      const songAPIpath = songDataResp.api_path;
      GENIUS_SONG_DETAILS_URI =
        GENIUS_BASE_URI +
        `${songAPIpath}?access_token=${process.env.REACT_APP_GENIUS_TOKEN}&text_format=plain`;

      return fetch(GENIUS_SONG_DETAILS_URI, GENIUS_AUTH_HEADERS);
    })
    .then((resp) => resp.json())
    .then((resp) => resp.response.song.media)
    .then((songMediaData) => {
      let youTubeObject = songMediaData.find(
        (mediaObj) => mediaObj.provider === "youtube"
      );
      if (!youTubeObject) youTubeObject = { url: '' };
      cache.audioPreviewURL = youTubeObject.url;
      return fetchLyrics(GENIUS_LYRICS_URI);
    })
    .then((resp) => JSON.parse(resp))
    .then((resp) => {
      cache.lyrics = resp.lyrics;
      return cache;
    })
    .catch(() => Promise.reject({ errorMessage: "Not Found" }));
};

exports.handler = async function (event, context) {
  if (event.httpMethod === "GET") {
    const songUserTitle = event.queryStringParameters.q;
    try {
      const response = await search(songUserTitle);
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    } catch (err) {
      return {
        statusCode: 404,
        body: JSON.stringify(err),
      };
    }
  }
};
