import { useState } from 'react';
import { NavBar } from './components/NavBar';
import './App.scss';
import { WelcomePage } from './pages/WelcomePage';
import { PageChangerContext } from './_contexts';
import Footer from './components/Footer';

function App() {
  const [page, setPage] = useState(<WelcomePage />);

  return (
    <>
      <div id='App' className='flex-container'>
        <PageChangerContext.Provider value={{ changePage: newPage => setPage(newPage) }}>
          <div className='flex-row'>
            <NavBar />
          </div>
          <div id='PageContent'>{page}</div>
        </PageChangerContext.Provider>
      </div>
      <Footer />
    </>
  );
}

export default App;
