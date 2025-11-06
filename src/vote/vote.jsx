import React from 'react';
import './vote.css';
import { VoteList } from './voteList';

export function Vote() {
    const [songs, setSongs] = React.useState([]);
    const [voted, setVoted] = React.useState([]);

    React.useEffect(() => {
        async function fetchSongs() {
            try {
                const response = await fetch('/api/songs');
                if (!response.ok) throw new Error('Failed to fetch songs');
                const data = await response.json();
                setSongs(data);
            } catch (err) {
                console.error('Error loading songs:', err);
                // fallback to local storage in case backend is down
                const stored = JSON.parse(localStorage.getItem('suggestedSongs')) || [];
                setSongs(stored);
            }
        }

        fetchSongs();
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

        setVoted(prev =>
            prev.includes(trackName)
                ? prev.filter(id => id !== trackName)
                : [...prev, trackName]
        );
    }

    return (
        <main>
            <h2>Vote on Song Suggestions</h2>
            <VoteList songs={songs} voted={voted} onVote={handleVote} />
        </main>
    );
}
