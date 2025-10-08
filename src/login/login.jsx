import React from 'react';

export function Login() {
  return (
    <main>
      <form className="login-form" method="get" action="vote.html">
        <h2>Login</h2>
        <div>
          <label>Name:</label>
          <input type="text" placeholder="Your Name" />
        </div>
        <div>
          <label>Password:</label>
          <input type="text" placeholder="password" />
        </div>
        <div className="buttons">
          <input type="button" value="Create" />
          <input type="button" value="Login" />
        </div>
      </form>
    </main>
  );
}
