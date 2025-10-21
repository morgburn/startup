import React from 'react';

export function SongResults({ songs }) {
    if (songs.length === 0) {
        return <p>No results</p>;
    }

    return (
        <div className="search-results">
            {songs.map((song, index) => (
                <div key={index} className="result-item">
                    <img src={song.albumCover} alt={song.trackName} width="60" />
                    <span classname="song-text">
                        {song.trackName} - {song.artist}
                    </span>
                    <button className="suggest-button">Suggest</button>
                </div>
            ))}
        </div>
    );
}