import React from 'react';
import Tracklist from '../Tracklist/Tracklist';

function Playlist({playlistName, playlistTracks, onRemoveTrack, onNameChange, onSavePlaylist}) {
    return (
        <div className="Playlist">
            <div className="Input">
                <input 
                    type="text"
                    value={playlistName}
                    onChange={(e)=> onNameChange(e.target.value)}
                />

            </div>
            <div className="PlaylistContainer">
                <Tracklist tracks={playlistTracks} onRemoveTrack={onRemoveTrack} />
                <div className="ButtonContainer">

                    <button className="PlaylistSaveButton" onClick={onSavePlaylist}> Save to Spotify</button>
                </div>
            </div>
        </div>
    );
}

export default Playlist;