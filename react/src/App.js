import { useEffect, useState } from 'react';
import style from './App.module.scss';
import { checkAuthenticationAsync } from './lib/backendService';
import NavBar from './components/NavBar';



function App() {
  const [authStatus, setAuthStatus] = useState(undefined);

  useEffect(() => {
    checkAuthenticationAsync()
      .then(res => setAuthStatus(res.authenticated))
      .catch(err => console.error(err));
  }, [authStatus]);

  return (
    <div id={style.App}>
      <NavBar/>
    </div>
  );
}

export default App;
