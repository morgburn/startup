import React from 'react';
import './suggest.css';
import { SearchBar } from './searchbar';
import { SongResults } from './results';

export function Suggest() {
    const [songs, setSongs] = React.useState([]);
    const [suggestedSongs, setSuggestedSongs] = React.useState(
        JSON.parse(localStorage.getItem('suggestedSongs')) || []
    );

    function songResults(term) {
        return [
            { trackName: `${term}`, artist: 'Artist 1', albumCover: 'images/album_cover.png'},
        ].filter(song => song.trackName.toLowerCase().includes(term.toLowerCase()));
    }

    function handleSearch(term) {
        if (!term) {
            alert('Please enter a search term');
            return;
        }
        const results = songResults(term);
        setSongs(results);
    }

    function handleSuggest(song) {
        if (suggestedSongs.some(s => s.trackName === song.trackName)) return;

        const newSong = { ...song, votes: 0 };
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