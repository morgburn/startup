import React from 'react';

export function Authenticated({userName}) {

    return (
        <main className="welcome">
            <h2>Welcome, {userName}!</h2>
        </main>
    );
}