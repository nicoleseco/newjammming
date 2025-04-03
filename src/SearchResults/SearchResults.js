import React from 'react';
import './SearchResults.css';

function SearchResults({searchResults, onAddTrack}) {
    return (
        <div className="SearchResults">
            <h2>Search Results</h2>
            <div className="Tracklist">
                {searchResults.map((track)=> (
                    <div className="Track" key={track.id}>
                        <div className="TrackInformation">
                            <p>{track.name} / {track.artist} / {track.album}</p>
                        </div>
                        <button className="TrackAction" onClick={()=> onAddTrack(track)}> + </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchResults;