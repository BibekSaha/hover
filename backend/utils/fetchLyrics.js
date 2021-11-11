const axios = require('axios');
const cheerio = require('cheerio');

// Scrapes the lyrics from the genius website
module.exports = async url => {
  try {
    const { data: html } = await axios.get(url, {
      responseType: 'text'
    });
    const $ = cheerio.load(html);

    const longClassName = process.env.LYRICS_CONTAINER;
    const className = html.indexOf(longClassName) !== -1 ? longClassName: 
    'lyrics';
  
    console.log(className);

    // If the classname is the simple one
    // then no need to do the extra shenanigans below
    if (className === 'lyrics')
      return {
        lyrics: $('div.lyrics').text().trim()
      };

    let lyrics = [];

    // Push all the div that contains the classname into lyrics as html
    $(`div.${className}`)
      .each(
        (_, e) => lyrics.push($(e).html())
      );

    // Replace the <br> with \n of each element of lyrics
    lyrics = lyrics.map(el => {
      el = el.replace(/\<br\>/g, '\n');
      return cheerio.load(el).text().trim();
    });

    // Join each element with a new line 
    lyrics = lyrics.join('\n');

    return { lyrics };
  } catch (err) {
    return { lyrics: '' }
  }
};