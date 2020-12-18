import styles from './SearchBar.module.scss';
import searchIcon from '../assets/search-icon.png';

export const MainComponent = props => {
  return (
    <form id={styles.Form} onSubmit={props.submitHandler}>
      <input type='text' name='search' onChange={props.changeHandler} placeholder='Search...' />
      <img src={searchIcon} alt='' />
    </form>
  );
};

export { MainComponent as SearchBar };
