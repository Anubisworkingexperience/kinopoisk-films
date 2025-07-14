import { FilmList } from './components/FilmList'
import styles from './styles/app.module.css';
import { FilterSearch } from './components/FilterSearch';
import {Routes, Route} from "react-router-dom";
import { FilmPage } from './pages/FilmPage';
import { FavoritePage } from './pages/FavoritePage';

function App() {

  return (
    <Routes>
      <Route path='/' element={
        <> 
        <h1 className={styles.catalogTitle}>Каталог фильмов</h1>
        <FilterSearch />
        <FilmList />
        </>
        } />
      <Route path='/film/:id' element={ <FilmPage /> }/>
      <Route path='/favorites' element={<FavoritePage />}></Route>
    </Routes>
  )
}

export default App
