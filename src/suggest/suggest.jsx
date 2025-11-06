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

    function handleSuggest(song) {
        if (suggestedSongs.some(s => s.trackName === song.trackName)) return;

        const newSong = { 
        trackName: song.trackName,
        artist: song.artist,
        albumCover: song.albumCover,
        votes: 0
        };
        const updated = [...suggestedSongs, newSong];
        setSuggestedSongs(updated);
        localStorage.setItem('suggestedSongs', JSON.stringify(updated));
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