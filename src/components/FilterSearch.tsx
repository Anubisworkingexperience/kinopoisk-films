import styles from '../styles/app.module.css';
import { useState } from 'react';
import favoriteIcon from '../assets/favorite-svgrepo-com.svg';
import { Link } from 'react-router';

interface modalsOpenState {
  genreOpened: boolean,
  ratingOpened: boolean,
  yearOpened: boolean
}

export function FilterSearch() {

  const [modalsOpened, setModalsOpened] = useState<modalsOpenState>({
    genreOpened: false,
    ratingOpened: false,
    yearOpened: false
  });

  return (
    <>
    <div className={styles.filters}>
      <p>Отфильтровать по: </p>
      <div className={styles.filterLink} onMouseEnter={() => setModalsOpened((prev) => ({...prev, genreOpened: true}))}
        onMouseLeave={() => setModalsOpened((prev) => ({...prev, genreOpened: false}))}>
        <a href="#"
        >жанру</a>
        {modalsOpened.genreOpened && <div className={styles.genreModal}>
          <h2>Выберите жанр</h2>
          <label htmlFor="">something</label>
          <input type="checkbox" name="" id="" />
          </div>}
      </div>
       <div className={styles.filterLink} onMouseEnter={() => setModalsOpened((prev) => ({...prev, ratingOpened: true}))}
        onMouseLeave={() => setModalsOpened((prev) => ({...prev, ratingOpened: false}))}>
         <a href="#">рейтингу</a>
         {modalsOpened.ratingOpened && <div className={styles.ratingModal}>
          <h2>Выберите рейтинг</h2>
          <label htmlFor="">something</label>
          <input type="checkbox" name="" id="" />
          </div>}
       </div>
       <div className={styles.filterLink} onMouseEnter={() => setModalsOpened((prev) => ({...prev, yearOpened: true}))}
        onMouseLeave={() => setModalsOpened((prev) => ({...prev, yearOpened: false}))}>
         <a href="#">году выпуска</a>
            {modalsOpened.yearOpened && <div className={styles.ratingModal}>
            <h2>Выберите год</h2>
            <label htmlFor="">something</label>
            <input type="checkbox" name="" id="" />
            </div>}
       </div>
       <Link to="/favorites">
       <>
       <img src={favoriteIcon} alt="favorites star icon" className={styles.favIcon}/>
       </>
       </Link>
    </div>
    </>
  )
}