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










  return (
        <main>
            <h2>Song Suggestions</h2>
            <h4>(Powered by iTunes API)</h4>
            <form className="search-bar">
                <label>Search song title or artist:</label>
                <input type="text" placeholder="e.g. Huntrix Golden" />
                <input type="button" value="Search" />
            </form>

            <div className="search-results">
                <img src="images/album_cover.png" alt="Album Placeholder" width="60" />
                <span className="song-text">Golden - Huntrix</span>
                <button className="suggest-button">Suggest</button>
            </div>
        </main>
  );
}