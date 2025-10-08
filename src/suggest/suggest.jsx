import React from 'react';
import './suggest.css';

export function Suggest() {
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