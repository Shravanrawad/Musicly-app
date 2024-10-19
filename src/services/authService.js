const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const AUTH_ENDPOINT = import.meta.env.VITE_SPOTIFY_AUTH_ENDPOINT;
const REDIRECT_URI =  import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

const RESPONSE_TYPE = 'token';
const SCOPES = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-library-read',
  'user-top-read',
  'user-read-private',
  'streaming',
  'user-read-currently-playing'
].join('%20');

export const getAuthUrl = () => {
  return `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`;
};
