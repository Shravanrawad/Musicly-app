import React, { useState, useEffect, useCallback } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { searchSongs, clearResults } from '../redux/searchSlice';
import MusicPlayer from '../componants/musicplayer'; 

function SearchPage() {
  const [query, setQuery] = useState('');
  const [token, setToken] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); 
  const [isPlaying, setIsPlaying] = useState(false); 

  const dispatch = useDispatch();
  const results = useSelector((state) => state.search.results);
  const status = useSelector((state) => state.search.status);
  const error = useSelector((state) => state.search.error);

  useEffect(() => {
    const storedToken = localStorage.getItem('spotify_token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = useCallback(
    debounce((query) => {
      if (query.trim() && token) {
        dispatch(searchSongs({ query, token }));
      } else {
        dispatch(clearResults());
      }
    }, 300),
    [dispatch, token]
  );

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  const handlePlayPause = (index) => {
    if (currentTrackIndex === index) {
     
      setIsPlaying(!isPlaying);
    } else {
   
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    }
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <button className="text-white mb-6 flex items-center gap-2" onClick={() => window.history.back()}>
        <IoMdArrowRoundBack size={32} />
        <p>Back to home</p>
      </button>

      <h2 className="text-3xl font-bold mb-6">Search for Songs</h2>

      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Search for a song..."
          value={query}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-lg focus:outline-none"
        />
      </div>

      {status === 'loading' && <p className="mb-2">Loading...</p>}
      {status === 'failed' && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {results.map((track, index) => (
          <div
            key={track.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center relative"
          >
            <img
              src={
                track.album.images[0]?.url || 'https://via.placeholder.com/150'
              }
              alt={track.name}
              className="w-32 h-32 rounded-md mb-4"
            />
            <div className="text-center">
              <h3 className="font-semibold text-lg">{track.name.slice(0 , 16)}...</h3>
              <p className="text-sm text-gray-400">{track.artists[0]?.name}</p>
            </div>

            <button
              onClick={() => handlePlayPause(index)}
              className="absolute bottom-4 right-4 bg-green-500 p-2 rounded-full text-white hover:bg-green-400 transition"
            >
              {currentTrackIndex === index && isPlaying ? (
                <FaPause size={20} />
              ) : (
                <FaPlay size={20} />
              )}
            </button>
          </div>
        ))}
      </div>

    
      {results.length > 0 && (
        <MusicPlayer
          songs={results}
          currentTrackIndex={currentTrackIndex}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setCurrentTrackIndex={setCurrentTrackIndex}
        />
      )}
    </div>
  );
}

export default SearchPage;
