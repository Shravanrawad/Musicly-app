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
            src={userProfile.images[0]?.url || 'https://via.placeholder.com/50'}
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
