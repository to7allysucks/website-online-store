import styles from './Search.module.scss'

export const Search = ({querySearch, setQuerySearch}) => {
  return (
    <>
      <input className={styles.search}
             type="search"
             placeholder='Search'
             value={querySearch}
             onChange={e => setQuerySearch(e.target.value)}
             img/>
    </>
  );
};
