import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Authenticated({userName}) {
    const navigate = useNavigate();

    return (
        <main className="welcome">
            <h2>Welcome, {userName}!</h2>
        </main>
    );
}