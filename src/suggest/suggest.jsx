import React from 'react';
import './suggest.css';
import { SearchBar } from './searchbar';
import { Results } from './results';

export function Suggest() {
    const [songs, setSongs] = React.useState([]);

    function getSongs(term) {
        return [
            { trackName: 'Golden', artist: 'Huntrix', albumCover: 'images/album_cover.png'},
            { trackName: 'Soda Pop', artist: 'Saja Boys', albumCover: 'images/album_cover_2.png'},
        ].filter(song => song.trackName.toLowerCase().includes(term.toLowerCase()));
    }

    function handleSearch(term) {
        if (!term) {
            alert('Please enter a search term');
            return;
        }
        const results = getSongs(term);
        setSongs(results);
    }

    return (
        <main>
            <h2>Song Suggestions</h2>
            <h4>Powered by iTunes API</h4>
            <SearchBar onSearch={handleSearch} />
            <Results songs={songs} />
        </main>
    );
}