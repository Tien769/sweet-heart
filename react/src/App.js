import { useEffect, useState } from 'react';
import style from './App.module.scss';
import { checkAuthenticationAsync } from './lib/backendService';
import NavBar from './components/NavBar';
//import ConTract from './components/ConTract';
//import HelpOne from './components/HelpOne';
//import HelpTwo from './components/HelpTwo';
import HelpThree from './components/HelpThree';

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
      <HelpThree/>
    </div>
  );
}

export default App;
