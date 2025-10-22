import React from 'react';
import './scores.css';

export function Scores() {
    const [scores, setScores] = React.useState([]);

    React.useEffect(() => {
        const scoresText = localStorage.getItem('suggestedSongs');
        if (scoresText) {
            const songs = JSON.parse(scoresText);
            const scoreData = songs.map((song, index) => ({
                id: index + 1,
                name: song.trackName,
                scores: song.votes || 0,
            }));
            scoreData.sort((a, b) => b.score - a.score);
            setScores(scoreData);
        }
    }, []);

    const scoreRows = scores.length ? scores.map((score, i) => (
        <tr key={(score.id)}>
            <td>{i + 1}</td>
            <td>{score.name}</td>
            <td>{score.score}</td>
        </tr>
    )) : (
        <tr key="0">
          <td colSpan="4">No votes yet</td>
        </tr>
    );

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
                <tbody>{scoreRows}</tbody>
            </table>
        </main>
  );
}