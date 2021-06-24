import React, { useEffect, useState } from 'react';
import SameArtistSong from '../SameArtistSong/SameArtistSong';

const SameArtist = ({ artistId }) => {
  const [songList, setSongList] = useState([]);
  const [nextPage, setNextPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(`/api/v1/artists/${artistId}/songs?page=${nextPage}`);
      const { data } = await resp.json();
      console.log(data); // DELETE ME AFTER DONE
      setSongList(data);
    };
    fetchData();
  }, [setNextPage, setSongList, artistId, nextPage]);

  console.log(songList);

  const render = songList.length && songList.map(song => (
    <SameArtistSong 
      title={song.title}
      thumbnail={song.song_art_image_thumbnail_url}
      slug={song.slug}
    />
  ));

  if (!songList.length) return <h4>Loading...</h4>

  return (
    <div>
      {render}
      <button onClick={() => setNextPage(nextPage + 1)}>Load More...</button>
    </div>
  );
};

export default SameArtist;
