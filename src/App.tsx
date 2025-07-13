import { FilmList } from './components/FilmList'
import styles from './styles/app.module.css';
import { FilterSearch } from './components/FilterSearch';

function App() {

  return (
    <>
     <h1 className={styles.catalogTitle}>Каталог фильмов</h1>
     <FilterSearch />
     <FilmList />
    </>
  )
}

export default App
