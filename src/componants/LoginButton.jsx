import React from 'react';
import { getAuthUrl } from '../services/authService';

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = getAuthUrl();
  };

  return (
    <button onClick={handleLogin} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
      Login with Spotify
    </button>
  );
};

export default LoginButton;
