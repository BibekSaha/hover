import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TrackCard from '../TrackCard/TrackCard';

const SongSearchDisplay = () => {
  const slug = useParams();
  const [searchData, setSearchData] = useState(null);
  const searchTerm = slug.songSearch.replace(/-/g, ' ');
  useEffect(() => {
    (async () => {
      const resp = await fetch(`/api/v1/search?q=${searchTerm}`);
      const { data } = await resp.json();
      setSearchData(data);
      console.log(data);
    })();
  }, [searchTerm]);
  
  const renderList = searchData && searchData.map(el => {
    return <TrackCard
      key={el.id}
      link={`${el.title.toLowerCase().replace(/\s/g, '-')}-${el.id}`}
      showCross={false}
      onIconClick={null}
      onMouseOver={null}
      thumbnail={el.song_art_image_thumbnail_url}
      title={el.title}
      artist={el.primary_artist.name}
    />
  });
  
  return (
    <div className="search-song-display">
      <div className="all-tracks">
        {renderList}
      </div>
    </div>
  )
};

export default SongSearchDisplay;
