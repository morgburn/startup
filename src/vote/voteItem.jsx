import React from 'react';

export function VoteItem({ song, isVoted, onVote }) {
    return (
        <div className="song-suggestion">
            <span className="song-text">
                {song.trackName} - {song.artist}
            </span>
            <button className={`heart-button ${isVoted ? 'voted' : ''}`} onClick={onVote}>❤️</button>
            <span className="vote-count">{song.votes}</span>
        </div>
    );
}