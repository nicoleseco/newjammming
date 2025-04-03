import React from 'react';

function Tracklist({ tracks, onRemoveTrack}) {
    return (
        <div className="Tracklist">
            {tracks.map((track)=> (
                <div className="Track" key={track.id}>
                    <div className="TrackInfo">
                        <p>
                            {track.name} / {track.artist} / {track.album}
                        </p>
                    </div>
                    <button className="TrackAction TrackRemove" onClick={()=>onRemoveTrack(track)}>
                        x
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Tracklist;