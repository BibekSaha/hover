import React from 'react';
import { useStore } from '../../store';
import './SongDisplay.css';
import SongNotFound from '../SongNotFound/SongNotFound';

const SongDisplay = props => {
  const [store] = useStore();
  if (store.notFound) return <SongNotFound message="Sorry :-( the song is not available..." />
  if (!store.lyrics) return <SongNotFound message="Sorry :-( the lyrics is not available..." />
  const marginBottom = window.screen.width < 700 ? '11rem' : '18rem';
  return (
    <div className="SongDisplay">
      <div 
        style={{ 
          marginBottom: store.showSongDetailsCard ? marginBottom : null 
        }}
        className="SongDisplay__text"
      >
        {store.lyrics}
      </div>
    </div>
  );
};

export default SongDisplay;