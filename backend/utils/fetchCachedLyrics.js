const { promisify } = require('util');
const cache = require('../cache');
const fetchLyrics = require('./fetchLyrics');

module.exports = async url => {
  try {
    url = url.toLowerCase();
    console.log(url);
    const cachedLyrics = await promisify(cache.get).call(cache, url);
    if (cachedLyrics !== null)
      return { lyrics: cachedLyrics };
    /**
     * fetchLyrics(url)
     *    --> { lyrics: ~ the lyrics goes here ~ }
     */
    const lyricsData = await fetchLyrics(url);
    if (lyricsData.lyrics)
      cache.set(url, lyricsData.lyrics);
    return lyricsData;
  } catch {
    return { lyrics: '' }
  }
};