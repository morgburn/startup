import React from 'react';

export function Unauthenticated({ onLogin }) {
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function loginUser() {
        if (!userName || !password) {
            alert('Please enter a username and password');
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: userName, password }),
            });

            if (response.ok) {
              const user = await response.json();
              localStorage.setItem('userName', user.email);
              onLogin(user.email);
            } else {
              alert('User already exists');
            }
          } catch (err) {
            console.error('Create error:', err);
            alert('Error connecting to server');
          }
        }


  return (
    <form className="login-form" onSubmit={(e) => e.preventDefault()}>
      <h2>Login or Create Account</h2>
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
        <button type="button" onClick={loginUser}>
          Login
        </button>
        <button type="button" onClick={createUser}>
          Create
        </button>
      </div>
    </form>
  );
}