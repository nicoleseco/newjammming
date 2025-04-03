import React, {useState, useEffect} from 'react';
import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import Playlist from './Playlist/Playlist';
import './App.css';
import Spotify from './Spotify';

function App() {
  const [playListURIs, setPlaylistURIs] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isTokenReady, setIsTokenReady] = useState(true);

  useEffect(()=> {
    const token = Spotify.getAccessToken();
    if(token) {
      setIsTokenReady(true);
    }
  }, []);

  const addTrack = (track) =>{
    if (!playlistTracks.some((playlistTrack)=> playlistTrack.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
      setPlaylistURIs([...playListURIs, track.uri]);
    }
  };
  const removeTrack = (track) => {
    const updatedPlaylist = playlistTracks.filter((playlistTrack) => playlistTrack.id !== track.id);
    setPlaylistTracks(updatedPlaylist);
  };

  const updatePlaylistName = (newName) => {
    setPlaylistName(newName);
  };

  const search = async (term) => {
    if (!isTokenReady) {
      console.log('Token is not ready. Unable to perform search at this time');
      return;
    }
    console.log(`Searching for: ${term}`);
    const tracks = await Spotify.search(term);
    console.log(`Search results: ${tracks.length} tracks found`);
    setSearchResults(tracks);
  };

  const saveToSpotify = async () => {
    const userID = await Spotify.getUserID();
    const playlistID = await Spotify.createPlaylist(userID, playlistName);
    const trackURIs = playlistTracks.map((track) => track.uri);
    await Spotify.addTracksToPlaylist(userID, playlistID, trackURIs);

    setPlaylistName('New Playlist');
    setPlaylistTracks([]);
  };


  return (
    <div className="App">
        <h1>Jammming</h1>
        <SearchBar onSearch={search} />
        <div className="Results">
          <SearchResults searchResults={searchResults} onAddTrack={addTrack} />
          <Playlist 
            playlistName={playlistName} 
            playlistTracks={playlistTracks}
            onRemoveTracks={removeTrack}
            onNameChange={updatePlaylistName}
            onSavePlaylist={saveToSpotify}
          />
        </div>
      
    </div>
  );
}

export default App;
