import styles from './NavBar.module.scss';
import cartImage from '../assets/cart.png';
import userIcon from '../assets/user-icon.png';
import { SearchBar } from './SearchBar';
import { useContext, useState } from 'react';
import { checkAuthenticationAsync, getCartItems, searchProductAsync } from '../lib/backendService';
import { PageChangerContext } from '../_contexts';
import { WelcomePage } from '../pages/WelcomePage';
import { AuthenticationPage } from '../pages/AuthenticationPage';

const MainComponent = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const { changePage } = useContext(PageChangerContext);

  const showCart = () => {
    getCartItems().then(res => console.log(res.cart));
  };

  const showAuthStatus = () => {
    checkAuthenticationAsync()
      .then(res => res.authenticated)
      .then(auth =>
        !auth ? changePage(<AuthenticationPage />) : console.log('ALREADY LOGGED IN')
      );
  };

  const handleSearch = e => {
    e.preventDefault();
    searchProductAsync({
      name: searchPhrase,
    }).then(res => {
      changePage(
        <div>
          <h1>RESULT PAGE</h1>
        </div>
      );
    });
  };

  return (
    <div id={styles.NavBar} className='flex-container'>
      <div id={styles.Brand} onClick={() => changePage(<WelcomePage />)}>
        <span>Sweet Heart</span>
      </div>
      <div id={styles.SearchBar}>
        <SearchBar
          submitHandler={handleSearch}
          changeHandler={e => setSearchPhrase(e.target.value)}
        />
      </div>
      <div id={styles.NavButtons}>
        <button onClick={showCart}>
          <img src={cartImage} alt='' />
        </button>
        <button onClick={showAuthStatus}>
          <img src={userIcon} alt='' />
        </button>
      </div>
    </div>
  );
};

export { MainComponent as NavBar };
