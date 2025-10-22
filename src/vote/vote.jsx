import React from 'react';
import './vote.css';
import { VoteList } from './voteList';

export function Vote() {
    const [songs, setSongs] = React.useState([]);
    const [voted, setVoted] = React.useState([]);

    React.useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('suggestedSongs')) || [];
    }, []);

    function handleVote(songId) {
        const updated = songs.map(song => {
            if (song.trackname === songId) {
                const newVotes = song.votes ? song.votes + 1 : 1;
                return { ...song, votes: newVotes };
            }
            return song;
        });
        setSongs(updated);
        localStorage.setItem('suggestedSongs', JSON.stringify(updated));

        setVoted(previousState =>
            previousState.includes(songId) ? previousState.filter(id => id !== songId) : [...previousState, songId]
        );
    }
  
    return (
        <main>
            <h2>Vote on Song Suggestions</h2>
            <VoteList songs={songs} voted={voted} onVote={handleVote} />
        </main>
  );
}