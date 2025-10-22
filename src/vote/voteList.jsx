import React from 'react';
import { VoteItem } from './voteItem';

export function VoteList({ songs, voted, onVote }) {
    if (songs.length === 0) {
        return <p>No songs suggested yet.</p>;
    }

    return (
        <div className="vote-list">
            {songs.map(song => (
                <VoteItem key={song.trackName} song={song} isVoted={voted.includes(song.trackName)} onVote={() => onVote(song.trackName)} />
            ))}
        </div>
    );
}