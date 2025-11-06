import React from 'react';
import './suggest.css';
import { SearchBar } from './searchbar';
import { SongResults } from './results';

export function Suggest() {
    const [songs, setSongs] = React.useState([]);
    const [suggestedSongs, setSuggestedSongs] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        async function fetchSuggestedSongs() {
            try {
                const response = await fetch('/api/songs');
                const data = await response.json();
                setSuggestedSongs(data);
            } catch (err) {
                console.error('Failed to load suggested songs', err);
            }
        }
        fetchSuggestedSongs();
    }, []);

    async function handleSearch(term) {
        if (!term) {
            alert('Please enter a search term');
            return;
        }

        setLoading(true);
        try {
            setSongs([]);
            const response = await fetch(
                `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=musicTrack&limit=20&country=US`
            );
            const data = await response.json();
            const results = data.results.map((song) => ({
                trackName: song.trackName,
                artist: song.artistName,
                albumCover: song.artworkUrl100,
            }));
            setSongs(results);
        } catch (error) {
            console.error('iTunes API error:', error);
            alert('Failed to fetch songs from iTunes');
        } finally {
            setLoading(false);
        }
    }

    async function handleSuggest(song) {
        try {
        const response = await fetch('/api/song', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(song),
        });

        if (!response.ok) {
            throw new Error('Failed to save song');
        }

        const updated = await response.json();
        setSuggestedSongs(updated);
    } catch (err) {
        console.error('Error suggesting song:', err);
        alert('Failed to save song');
    }
}

    return (
        <main>
            <h2>Song Suggestions</h2>
            <h4>Powered by iTunes API</h4>
            <SearchBar onSearch={handleSearch} />
            <SongResults songs={songs} suggestedSongs={suggestedSongs} onSuggest={handleSuggest} />
        </main>
    );
}