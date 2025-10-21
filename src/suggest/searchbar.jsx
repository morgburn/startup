import React from 'react';

export function SearchBar({ onSearch }) {
    const [query, setQuery] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onSearch(query);
    }
}