import React from 'react';
import { Link } from 'react-router-dom';
import style from './SameArtistSong.module.css';

const SameArtistSong = ({ title, slug, thumbnail }) => {
  return (
    <div>
      <Link to={`/song/${slug}`}>
        <div className={style.wrapper}>
          <img src={thumbnail} alt={title} />
          <p>{title}</p>
        </div>
      </Link>
    </div>
  );
};

export default SameArtistSong;