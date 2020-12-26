import styles from './NavBar.module.scss';
import cartImage from '../assets/cart.png';
import userIcon from '../assets/user-icon.png';
import { SearchBar } from './SearchBar';
import { useContext, useEffect, useState } from 'react';
import {
  checkAuthenticationAsync,
  searchProductAsync,
  unauthenticateAsync,
} from '../lib/backendService';
import { PageChangerContext } from '../_contexts';
import { WelcomePage } from '../pages/WelcomePage';
import { AuthenticationPage } from '../pages/AuthenticationPage';
import { TermsOfServicePage } from '../pages/TermsOfServicePage';
import { ContactPage } from '../pages/ContactPage';
import { CartPage } from '../pages/CartPage';

const MainComponent = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [user, setUser] = useState(undefined);
  const { changePage } = useContext(PageChangerContext);

  const showAuthStatus = () => {
    checkAuthenticationAsync()
      .then(res => res.authenticated)
      .then(auth =>
        !auth ? changePage(<AuthenticationPage />) : console.log('ALREADY LOGGED IN')
      );
  };

  useEffect(() => {
    if (!user)
      checkAuthenticationAsync().then(res => {
        if (res.authenticated) setUser(res.user);
      });
  }, [user]);

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
      <div id={styles.NavButtons}>
        <div>
          <button>Sản phẩm</button>
        </div>
        <div>
          <button onClick={() => changePage(<TermsOfServicePage />)}>Điều khoản</button>
        </div>
        <div>
          <button onClick={() => changePage(<ContactPage />)}>Liên hệ</button>
        </div>
      </div>
      <div id={styles.SearchBar}>
        <SearchBar
          submitHandler={handleSearch}
          changeHandler={e => setSearchPhrase(e.target.value)}
        />
      </div>
      <div id={styles.UserButtons}>
        <button onClick={() => changePage(<CartPage />)}>
          <img src={cartImage} alt='' />
        </button>
        <button onClick={showAuthStatus}>
          <img src={userIcon} alt='' />
          {user ? (
            <div className={styles.dropdown}>
              <div>
                <button>Trang cá nhân</button>
              </div>
              <div>
                <button
                  onClick={() =>
                    unauthenticateAsync().then(res => {
                      if (!res.authenticated) window.location.reload(true);
                    })
                  }
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : null}
        </button>
      </div>
    </div>
  );
};

export { MainComponent as NavBar };
