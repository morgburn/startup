import React from 'react';
import { voteItem } from './voteItem';

export function voteList({ songs, voted, onVote }) {
    return (
        <div className="vote-list">
            {songs.map(song => (
                <voteItem key={song.id} song={song} isVoted={voted.includes(song.id)} onVote={() => onVote(song.id)} />
            ))}
        </div>
    );
}