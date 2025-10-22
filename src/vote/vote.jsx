import React from 'react';
import './vote.css';
import { VoteList } from './voteList';

export function Vote() {
    const [songs, setSongs] = React.useState([]);
    const [voted, setVoted] = React.useState([]);

    React.useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('suggestedSongs')) || [];
        setSongs(stored);
    }, []);

    function handleVote(trackName) {
        const updated = songs.map(song => {
            if (song.trackName === trackName) {
                return { ...song, votes: (song.votes || 0) + 1 };
            }
            return song;
        });
        setSongs(updated);
        localStorage.setItem('suggestedSongs', JSON.stringify(updated));

        setVoted(previousState =>
            previousState.includes(trackName) ? previousState.filter(id => id !== trackName) : [...previousState, trackName]
        );
    }
  
    return (
        <main>
            <h2>Vote on Song Suggestions</h2>
            <VoteList songs={songs} voted={voted} onVote={handleVote} />
        </main>
  );
}