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
                
                setSongs(
                  data.map(song => ({
                    ...song,
                    votes: song.votes ?? 0
                  }))
                );

            } catch (err) {
                console.error('Error loading songs:', err);
                setSongs([]);
            }
        }

        fetchSongs();
    }, []);

  async function handleVote(trackName) {
    try {
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackName, score: 1 })
      });

      if (!response.ok) throw new Error('Failed to submit vote');

      const updatedScores = await response.json();
      const updated = updatedScores.find(s => s.trackName === trackName);

      setSongs(prev =>
        prev.map(song =>
          song.trackName === trackName
          ? {
            ...song,
            votes: updated.votes ?? song.votes
          }
          : song
        )
      )

      setVoted(prev =>
        prev.includes(trackName)
          ? prev.filter(id => id !== trackName)
          : [...prev, trackName]
      );

    } catch (err) {
      console.error('Error submitting vote:', err);
      alert('Failed to submit vote');
    }
  }

    return (
        <main>
            <h2>Vote on Song Suggestions</h2>
            <VoteList songs={songs} voted={voted} onVote={handleVote} />
        </main>
    );
}
