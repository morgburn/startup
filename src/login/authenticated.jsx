import React from 'react';

export function Authenticated({userName}) {
  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'DELETE',
      });
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      localStorage.removeItem('userName');
      onLogout();
    }
  }


    return (
        <main className="welcome">
            <h2>Welcome, {userName}!</h2>
        </main>
    );
}