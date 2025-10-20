export function Unauthenticated({ onLogin }) {
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');

    function loginUser() {
        if (!userName || !password) {
            alert('Please enter a username and password');
            return;
        }

        localStorage.setItem('userName', userName);
        onLogin(userName);
    }

      return (
    <main>
      <form className="login-form" method="get" action="vote.html">
        <h2>Login</h2>
        <div>
          <label>Name:</label>
          <input type="text" value={userName} onChange = {(e) => setUserName(e.target.value)} placeholder="Your Name" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
        </div>
        <div className="buttons">
            <button type="button" onClick={loginUser} disabled={!userName || !password}>
                Login
            </button>
            <button type="button" onClick={loginUser} disabled={!userName || !password}>
                Create
            </button>
        </div>
      </form>
    </main>
  );
}