import React from 'react';

export function voteItem({ song, isVoted, onVote }) {
    return (
        <div className="vote-item">
            <span className="song-info">
                {song.trackName} - {song.artist}
            </span>
            <button className={`heart-button ${isVoted ? 'voted' : ''}`} onClick={onVote}>❤️</button>
            <span className="vote-count">{song.votes}</span>
        </div>
    );
}