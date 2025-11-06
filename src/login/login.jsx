import React from 'react';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';

export function Login() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName'));
  
  function handleLogin(newUserName) {
    setUserName(newUserName);
    localStorage.setItem('userName', newUserName);
  }

  function handleLogout() {
    setUserName(null);
    localStorage.removeItem('userName');
  }

  return (
    <main>
      {userName ? (
        <Authenticated userName={userName} onLogout={handleLogout} />
      ) : (
        <Unauthenticated onLogin={handleLogin} />
      )}
    </main>
  );
}
