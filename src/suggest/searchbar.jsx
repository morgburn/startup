import React from 'react';

export function SearchBar({ onSearch }) {
    const [query, setQuery] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onSearch(query);
    }


    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <label>Search song title:</label>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. Golden"/>
            <button type="submit">Search</button>
        </form>
    );
}