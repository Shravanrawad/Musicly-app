import React, { useEffect, useRef } from 'react';
import { GiNextButton, GiPreviousButton } from 'react-icons/gi';
import { FaPause, FaPlay } from 'react-icons/fa';

const MusicPlayer = ({
  songs,
  currentTrackIndex,
  isPlaying,
  setIsPlaying,
  setCurrentTrackIndex,
}) => {
  const audioRef = useRef(null);

  const playSong = (url) => {
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play().catch((err) => console.error("Playback error:", err));
      setIsPlaying(true);
    }
  };

  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const nextSong = () => {
    const nextIndex = (currentTrackIndex + 1) % songs.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
  };

  const previousSong = () => {
    const prevIndex =
      currentTrackIndex === 0 ? songs.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying && currentTrackIndex !== null) {
      playSong(songs[currentTrackIndex]?.preview_url);
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [currentTrackIndex, isPlaying]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900 rounded-t-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={
              songs[currentTrackIndex]?.album?.images[0]?.url ||
              'https://via.placeholder.com/150'
            }
            alt="Album Art"
            className="w-16 h-16 rounded-lg shadow-lg"
          />
          <div className="ml-4">
            <h2 className="text-white font-semibold">
              {songs[currentTrackIndex]?.name || 'Select a song'}
            </h2>
            <p className="text-gray-400">
              {songs[currentTrackIndex]?.artists[0]?.name || 'Unknown Artist'}
            </p>
          </div>
        </div>

        <audio ref={audioRef} onEnded={nextSong} />

        <div className="flex items-center">
          <button
            onClick={previousSong}
            className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
          >
            <GiPreviousButton size={24} />
          </button>
          <button
            onClick={() =>
              isPlaying ? pauseSong() : playSong(songs[currentTrackIndex]?.preview_url)
            }
            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-400 transition mx-4"
          >
            {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
          </button>
          <button
            onClick={nextSong}
            className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
          >
            <GiNextButton size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
