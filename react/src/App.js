import { useEffect, useState } from 'react';
import style from './App.module.scss';
import { checkAuthenticationAsync } from './lib/backendService';
import Login from './Page/Login';
import Profile from './Page/Profile'

function App() {
  const [authStatus, setAuthStatus] = useState(undefined);

  useEffect(() => {
    checkAuthenticationAsync()
      .then(res => setAuthStatus(res.authenticated))
      .catch(err => console.error(err));
  }, [authStatus]);

  return (
    <div id={style.App}>
      <Profile />
    </div>
  );
}

export default App;
