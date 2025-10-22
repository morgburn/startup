import React, { useState } from 'react';

export function SongResults({ songs, onSuggest, suggestedSongs }) {
    if (songs.length === 0) return <p>No results</p>;

    return (
        <div className="search-results">
            {songs.map((song, index) => {
                const alreadySuggested = suggestedSongs.some(
                    (s) => s.trackName === song.trackName
                );

                return (
                    <div key={song.trackName} className="result-item">
                        <img src={song.albumCover} alt={song.trackName} width="60" />
                        <span className="song-text">
                            {song.trackName} - {song.artist}
                        </span>
                        <button
                            className="suggest-button"
                            onClick={() => onSuggest(song)}
                            disabled={alreadySuggested}
                        >
                            {alreadySuggested ? 'Suggested' : 'Suggest'}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
