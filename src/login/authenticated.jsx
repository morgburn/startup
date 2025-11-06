import React from 'react';

export function Authenticated({userName, onLogout}) {
  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'DELETE',
      });
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      onLogout();
    }
  }


  return (
    <main className="welcome">
      <h2>Welcome, {userName}!</h2>
      <button onClick={handleLogout}>Logout</button>
    </main>
  );
}