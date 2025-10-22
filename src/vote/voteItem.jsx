import React from 'react';

export function VoteItem({ song, isVoted, onVote }) {
    return (
        <div className="song-suggestion">
            <img src="/images/album_cover.png" alt="Album Cover Placeholder" width="60" />
            <span className="song-text">
                {song.trackName} - {song.artist}
            </span>
            <button className={`heart-button ${isVoted ? 'liked' : ''}`} onClick={onVote}>♥</button>
        </div>
    );
}