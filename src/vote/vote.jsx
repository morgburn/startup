import React from 'react';
import './vote.css';
import { voteList } from './voteList';

export function Vote() {
    const [songs, setSongs] = React.useState([
        { id: 1, trackName: 'Song Mockup', artist: 'Artist Mockup'},
        { id: 2, trackName: 'Another Song Name', artist: 'Example Artist'},
    ]);

    const [voted, setVoted] = React.useState([]);

    function handleVote(songId) {
        setVoted((currentState) =>
            currentState.includes(songId)
                ? currentState.filter((id) => id !== songId)
                : [...currentState, songId]
        );
    }
  
    return (
        <main>
            <h2>Vote on Song Suggestions</h2>
            <voteList songs={songs} voted={voted} onVote={handleVote} />
        </main>
  );
}