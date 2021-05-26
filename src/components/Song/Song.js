/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { set, get } from 'idb-keyval';
import { useStore } from '../../store';
import Loader from '../Loader/Loader';
import SongDisplay from '../SongDisplay/SongDisplay';
import SongDetailsCard from '../SongDetailsCard/SongDetailsCard';
import tempResponseCreator from '../../utils/tempResponseCreator';
import constructSearchUri from '../../utils/constructSearchUri';
import INITIAL_STATE from '../../store/__init__';
import songStore from '../../utils/songStore';

/* data fetching component */
const Song = () => {
  const { songSlug } = useParams();
  // DO NOT INCLUDE setStore IN DEPENDENCY ARRAY
  const [,setStore] = useStore();
  const [loading, setLoading] = useState(true);

  const searchForSongInLocalCache = async (songSlug) => {
    let cachedSong = await get(songSlug, songStore);
    if (cachedSong) {
      document.title = `${cachedSong.fullTitle} | Hover`;
      setStore({ ...cachedSong, notFound: false });
      setLoading(false);
      localStorage.setItem('last-played', songSlug);
    }
    return !!cachedSong;
  };

  useEffect(() => {
    document.title = 'Song | Hover';
    // When the user reloads then start playing the song from the start
    sessionStorage.clear();
  }, []);
  
  useEffect(() => {
    let slug = songSlug;
    const fetchData = async () => {
      setLoading(true);
      setStore(INITIAL_STATE);
      try {
        if (await searchForSongInLocalCache(songSlug)) return;

        if (!songSlug.match(/(\d+)(?!.*\d)$/)) {
          // e.g. /song/let-it-be
          const songSearchString = slug.toLowerCase().replace(/-/g, ' ');
          const resp = await fetch(`/api/v1/search?q=${songSearchString}`);
          const { data: [tempSongData] } = await resp.json();
          if (!tempSongData) throw new Error();
          slug = constructSearchUri(tempSongData.title, tempSongData.id);
          document.title = `${tempSongData.title} | Hover`;
          window.history.replaceState(null, null, `/song/${slug}`);
          // check again if the song with the title and id exists in the cache
          if (await searchForSongInLocalCache(slug)) return;
        }

        const resp = await fetch(`/api/v1/songs/${slug}`);
        const { data } = await resp.json();
        // If the url slug is not in the right format
        slug = constructSearchUri(data.title, data.id);
        document.title = `${data.title} | Hover`;
        window.history.replaceState(null, null, `/song/${slug}`);

        const songData = tempResponseCreator(data);
        setStore({ ...songData, notFound: false });
        setLoading(false);

        await set(slug, songData, songStore);
        localStorage.setItem('last-played', slug);
      } catch (err) {
        setLoading(false);
        setStore({ ...INITIAL_STATE, notFound: true });
      }
    };
    fetchData();
  }, [songSlug]);

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
