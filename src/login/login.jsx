import React from 'react';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';

export function Login() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName'));
  function handleLogin(newUserName) {
    setUserName(newUserName);
    localStorage.setItem('userName', newUserName);
  }

  return (
    <main>
      {userName ? (
        <Authenticated userName={userName} />
      ) : (
        <Unauthenticated onLogin={handleLogin} />
      )}
    </main>
  );
}
