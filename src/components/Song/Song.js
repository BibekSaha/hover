/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Store, set, get } from 'idb-keyval';
import { useStore } from '../../store';
import Loader from '../Loader/Loader';
import SongDisplay from '../SongDisplay/SongDisplay';
import SongDetailsCard from '../SongDetailsCard/SongDetailsCard';
import tempResponseCreator from '../../utils/tempResponseCreator';
import constructSearchUri from '../../utils/constructSearchUri';
import INITIAL_STATE from '../../store/__init__';

/* data fetching component */
const Song = () => {
  const { songSlug } = useParams();
  // DO NOT INCLUDE setStore IN DEPENDENCY ARRAY
  const [,setStore] = useStore();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setStore(INITIAL_STATE);
      try {
        const songStore = new Store('songs', 'song-store');
        let cachedSong = await get(songSlug, songStore);
        if (cachedSong) {
          document.title = `${cachedSong.fullTitle} | Hover`;
          setStore({ ...cachedSong, notFound: false });
          setLoading(false);
          return;
        }
        
        let slug = songSlug;
        if (!songSlug.match(/(\d+)(?!.*\d)$/)) {
          // e.g. /song/let-it-be
          const songSearchString = slug.toLowerCase().replace(/-/g, ' ');
          const resp = await fetch(`/api/v1/search?q=${songSearchString}`);
          const { data: [tempSongData] } = await resp.json();
          if (!tempSongData) throw new Error();
          slug = constructSearchUri(tempSongData.title, tempSongData.id);
          document.title = `${tempSongData.title} | Hover`;
          window.history.replaceState(null, `${tempSongData.title} | Hover`, `/song/${slug}`);
          // check again if the song with the title and id exists in the cache
          cachedSong = await get(slug, songStore);
          if (cachedSong) {
            setStore({ ...cachedSong, notFound: false});
            setLoading(false);
            return;
          }
        }
        const resp = await fetch(`/api/v1/songs/${slug}`);
        const { data } = await resp.json();
        const songData = tempResponseCreator(data);
        // If the url slug is not in right format
        const newUrlSlug = `${data.title.toLowerCase().replace(/\s/g, '-')}-${data.id}`;
        window.history.replaceState(null, null, `/song/${newUrlSlug}`);
        setStore({ ...songData, notFound: false });
        setLoading(false);

        document.title = `${songData.fullTitle} | Hover`;
        await set(newUrlSlug, songData, songStore);
        localStorage.setItem('last-played', newUrlSlug);
      } catch (err) {
        setLoading(false);
        setStore({ ...INITIAL_STATE, notFound: true });
      }
    };
    fetchData();
  }, [songSlug]);

  useEffect(() => {
    document.title = 'Song | Hover';
  }, []);

  if (loading)
    return <Loader color="var(--secondary)" size="70" />;
  return (
    <React.Fragment>
      <SongDisplay />
      <SongDetailsCard />
    </React.Fragment>
  );
};

export default Song;

// class Song extends React.Component {
//   updateSongComponent() {
//     this.props.resetData();
//     sessionStorage.clear();
//     const song = this.props.match.params.song
//       .split('-')
//       .join(' ')
//       .toLowerCase()
//       .trim();
//     this.props.getSong(song);
//   }

//   componentDidMount() {
//     this.updateSongComponent();
//     document.title = 'Song | Hover';
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.match.params.song !== this.props.match.params.song)
//       this.updateSongComponent();
//     else if (prevProps.match.params.song === this.props.match.params.song)
//       this.props.data.showSongDetailsCard = true;
//     document.title = `${this.props.data.fullTitle || 'Song'} | Hover`;
//   }

//   render() {
//     if (this.props.data.loading)
//       return <Loader color="var(--secondary)" size="70" />;
//     return (
//       <React.Fragment>
//         <SongDisplay
//           songLyrics={this.props.data.lyrics}
//           notFound={this.props.data.notFound}
//           showSongDetailsCard={this.props.data.showSongDetailsCard}
//         />
//         <SongDetailsCard
//           showSongDetailsCard={this.props.data.showSongDetailsCard}
//           bringShowSongDetailsCard={this.props.bringShowSongDetailsCard}
//           notFound={this.props.data.notFound}
//           removeShowSongDetailsCard={this.props.removeShowSongDetailsCard}
//           title={this.props.data.fullTitle}
//           artist={this.props.data.artistName}
//           thumbnail={this.props.data.imageURL}
//           audioPreviewURL={this.props.data.audioPreviewURL}
//         />
//       </React.Fragment>
//     );
//   }
// }

// export default withRouter(Song);
