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
}