import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs, selectAllSongs } from '../redux/songSlice';
import MusicPlayer from './musicplayer';
import { FaPause, FaPlay } from 'react-icons/fa';
import { LuLoader2 } from "react-icons/lu";


function Songs({ token }) {
  const dispatch = useDispatch();
  const songs = useSelector(selectAllSongs);
  const status = useSelector((state) => state.songlist.status);
  const error = useSelector((state) => state.songlist.error);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); 
  useEffect(() => {
    if (token) {
      dispatch(fetchSongs(token));
    }
  }, [dispatch, token]);

  const handlePlayPause = (index) => {
    if (currentTrackIndex === index && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    }
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen mt-[50px] mb-20">
      <h2 className="text-3xl font-bold text-white mb-6">Your Top Tracks</h2>

      {status === 'loading' && <div className='w-full flex justify-center items-center'><LuLoader2 className='animate-spin h-6 w-6'/></div>}
      {status === 'failed' && <p className="text-red-500 p-2">Error: {error}</p>}

      {status === 'succeeded' && songs.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {songs.map((song, index) => (
            <div
              key={song.id}
              className="bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col items-center hover:scale-105 transition-transform"
            >
              <img
                src={song.album?.images[0]?.url || 'https://via.placeholder.com/150'}
                alt={song.name}
                className="w-32 h-32 rounded-md mb-4"
              />
              <h3 className="text-lg text-white font-semibold">{song.name.slice(0 , 16)}...</h3>
              <p className="text-sm text-gray-400">
                {song.artists[0]?.name}
              </p>
              <button
                onClick={() => handlePlayPause(index)}
                disabled={!song.preview_url}
                className={`mt-4 px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                  isPlaying && currentTrackIndex === index
                    ? 'bg-red-500'
                    : 'bg-green-500'
                } text-white`}
              >
                {isPlaying && currentTrackIndex === index ? (
                  <>
                    <FaPause /> Pause
                  </>
                ) : (
                  <>
                    <FaPlay /> Play
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No songs found.</p>
      )}

      <MusicPlayer
        songs={songs}
        currentTrackIndex={currentTrackIndex}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setCurrentTrackIndex={setCurrentTrackIndex}
      />
    </div>
  );
}

export default Songs;
