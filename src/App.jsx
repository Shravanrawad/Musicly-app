import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Callback from './pages/Callback';
import LoginButton from './componants/LoginButton'
import { HomePage } from './pages/home';
import SearchPage from './pages/searchpage';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('spotify_token'); 
    if (storedToken) {
      setToken(storedToken); 
      console.log('Stored token found:', storedToken); 
    }
  }, []);

  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/callback" element={<Callback setToken={setToken} />} />
          <Route
            path="/"
            element={
              <div>
                <HomePage token={token} />
              </div>
            }
          />
          <Route path='/search' element={<SearchPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
