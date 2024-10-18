import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

const Callback = ({ setToken }) => {

  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    let accessToken = '';

    if (hash) {
      accessToken = new URLSearchParams(hash.substring(1)).get('access_token');
      window.location.hash = ''; 
      console.log('Hash from URL:', hash); 
    }

    if (accessToken) {
      localStorage.setItem('spotify_token', accessToken); 
      setToken(accessToken); 
      navigate('/')
      console.log('Access token found:', accessToken); 
    } else {
      console.log('No access token found'); 
    }
  }, [setToken]);

  return <div>Loading...</div>; 
};

export default Callback;
