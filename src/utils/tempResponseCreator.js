export default song => {
  const filteredObj = {
    fullTitle: song.title,
    artistName: song.primary_artist.name,
    imageURL: song.song_art_image_thumbnail_url,
    lyrics: song.lyrics,
    audioPreviewURL: '',
    artistId: song.primary_artist.id
  };
  song.media.forEach(el => {
    if (el.provider.toLowerCase() === 'youtube')
      filteredObj.audioPreviewURL = el.url;
  });
  return filteredObj;
};
