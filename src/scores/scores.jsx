import React from 'react';
import './scores.css';

export function Scores() {
    const [scores, setScores] = React.useState([]);

    React.useEffect(() => {
        const stored = localStorage.getItem('suggestedSongs');
        if (stored) {
            const songs = JSON.parse(stored);
            const sorted = songs
                .filter(song => song.votes && song.votes > 0)
                .sort((a, b) => b.votes - a.votes);
            setScores(sorted);
        }
    }, []);

  return (
        <main>
            <h2>Top Suggestions</h2>
            <table>
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Votes</th>
                </tr>
                </thead>
                <tbody>
                    {scores.length > 0 ? (
                        scores.map((song, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{song.trackName}</td>
                                <td>{song.artist}</td>
                                <td>{song.votes}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No votes yet</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </main>
  );
}