import React from 'react';
import './scores.css';

export function Scores() {
    const [songs, setSongs] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/scores')
            .then((response) => response.json())
            .then((songs) => {
                setSongs(songs);
            })
            .catch((err) => {
                console.error('Failed to fetch scores:', err);
            });
    }, []);

    const songRows = [];
    if (songs.length) {
        for (const [i, song] of songs.entries()) {
            songRows.push(
                <tr key={i}>
                <td>{i + 1}</td>
                <td>{song.trackname}</td>
                <td>{song.artist}</td>
                <td>{song.votes}</td>
                </tr>
            );
        }
    } else {
        songRows.push(
            <tr key='0'>
                <td colSpan='4'>Be the first to suggest or vote!</td>
            </tr>
        );
    }

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
                <tbody id="songs">{songRows}</tbody>
            </table>
        </main>
  );
}