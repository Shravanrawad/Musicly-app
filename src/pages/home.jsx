import { useEffect, useState } from 'react';
import Songs from '../componants/songs';
import LoginButton from '../componants/LoginButton';
import { FaSearch } from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom'


export const HomePage = ({ token, setToken }) => {
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const fetchUserProfile = async () => {
    const savedToken = localStorage.getItem('spotify_token');
    if (!savedToken) return;

    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('User Profile:', data);
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('spotify_token');
    setToken(null);
    window.location.href = window.location.href; 
  };
  

  return (
    <div>
      {userProfile ? (
        <header className="bg-black text-white shadow-md flex items-center justify-between p-4">
      
        <div
          className="flex items-center cursor-pointer"
          onClick={() => history.push('/')}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
            alt="Spotify Logo"
            className="w-28 md:w-32"
          />
        </div>
  
       
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-green-500 transition">Home</a>
         <Link className='hover:text-green-500 transition' to={'/search'}>Search</Link>
          <a href="#" className="hover:text-green-500 transition">Library</a>
        </nav>
  
       
        <div className="flex items-center gap-4">
         
          <button
            className="md:hidden text-white hover:text-green-500 transition"
            onClick={() => navigate('/search') }
          >
            <FaSearch size={20} />
          </button>         
          <img
            src={userProfile.images[0]?.url || 'data:image/jpeg;base64,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'}
            alt="Profile"
            className="rounded-full w-10 h-10 object-cover border-2 border-white shadow"
          />
  
          <p className="font-semibold hidden md:block">
            {userProfile.display_name}
          </p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 rounded-lg font-semibold hover:bg-red-600 transition transform hover:scale-105 focus:outline-none"
          >
            Logout
          </button>
        </div>
      </header>
      ) : (
        <div className="bg-white p-8 h-screen flex flex-col justify-center items-center rounded-lg shadow-lg text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
            alt="Spotify Logo"
            className="w-32 h-auto mx-auto mb-6"
          />
          <p className="text-gray-800 text-lg mb-4">
            No token found. Please log in.
          </p>
          <LoginButton />
        </div>
      )}
      {userProfile && <Songs token={token}/>  }  
    </div>
  );
};
