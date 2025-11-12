import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('userName');
        props.onLogout();
      });
  }

  return (
    <div>
      <div className='userName'>Welcome, {props.userName}</div>
      <Button variant='secondary' onClick={() => navigate('/suggest')}>
        Suggest a Song
      </Button>
      <Button variant='primary' onClick={() => navigate('/vote')}>
        Go to Vote Page
      </Button>
      <Button variant='outline-danger' onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
