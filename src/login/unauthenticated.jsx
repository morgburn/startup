import React from 'react';

export function Unauthenticated({ onLogin }) {
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

  async function loginOrCreate(endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userName, password }),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('userName', user.userName);
        onLogin(user.userName);
      } else {
        const body = await response.json();
        setError(body.msg || 'Unknown error');
      }
    } catch (err) {
      console.error(err);
      setError('Network or server error');
    }
  }


  return (
    <form className="login-form" onSubmit={(e) => e.preventDefault()}>
      <h2>Login or Create Account</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Your Name"
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <div className="buttons">
        <button
          type="button"
          onClick={() => loginOrCreate('/api/auth/login')}
          disabled={!userName || !password}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => loginOrCreate('/api/auth/create')}
          disabled={!userName || !password}
        >
          Create
        </button>
      </div>
    </form>
  );
}