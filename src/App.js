import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Sitebar from './home/Sitebar';
import Auth from './auth/Auth'
import ServiceIndex from './services/ServiceIndex';

function App() {
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'))
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  const protectedViews = () => {
    return (sessionToken === localStorage.getItem('token') ?
    <ServiceIndex token={sessionToken} /> : <Auth updateToken={updateToken} />)
  }

  return (
    <div /*className="App"*/>
      <Sitebar clickLogout={clearToken} />
      {protectedViews()}
      {/*<Auth updateToken={updateToken} />*/}
    </div>
  );
}

export default App;
