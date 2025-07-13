import { useState } from "react";
import { useEffect} from "react";
import styles from '../styles/catalog.module.css';
import logo from  "../assets/kinopoisk_logo.png";
// import { useSearchParams } from "react-router";

export function FilmList() {

  const [films, setFilms] = useState([
    {
      poster: {
        url: logo,
        previewUrl: "string"
      },
        name: "Название фильма",
        year: 2000,
        rating: {
        kp: 6.2,
        imdb: 8.4,
        tmdb: 3.2,
        filmCritics: 10,
        russianFilmCritics: 5.1,
        await: 6.1
      },
    }
  ]);

  const baseLink = `https://api.kinopoisk.dev/v1.4/movie/random`;

  useEffect(() => {

    const fetchData = () => {
      fetch(baseLink, {method: "GET", mode: "cors", headers: {"X-API-KEY": import.meta.env.VITE_API_KEY}})
    .then((response => response.json()))
    .then((response => {
      const newFilm = {
        poster: {
          url: response.poster.url,
          previewUrl: response.poster.previewUrl
        },
        name: response.name,
        year: response.year,
        rating: {
          kp: response.rating.kp,
          imdb: response.rating.imdb,
          tmdb: response.rating.tmdb,
          filmCritics: response.rating.filmCritics,
          russianFilmCritics: response.rating.russianFilmCritics,
          await: response.rating.await
        }
      }
      setFilms((prevFilms) => [...prevFilms, newFilm]);
    }
    ))
    .catch((error) => console.error(error));
    }

    const addFilmsOnScroll = () => {
      while (true) {
        const bottomWindowBorder = document.documentElement.getBoundingClientRect().bottom;

        if (bottomWindowBorder > document.documentElement.clientHeight + 100) {
          break;
        }

        //TODO: run 50 times
        fetchData();
      }
    }

    window.addEventListener('scroll', addFilmsOnScroll);
 
    for (let i = 0; i < 10; i++) {
      fetchData();
    }

    return () => {
      window.removeEventListener('scroll', addFilmsOnScroll);
    };

  }, [])

  return (
    <>
    <div className={styles.films}>
    {films.map((film, index) => (
      <div className={styles.film} key={index} >
      <img src={film.poster.url || film.poster.previewUrl || logo} alt={`Фильм: ${film.name || 'loading...'}`} className={styles.filmPoster}/>
      <div className="film-info">
        <p className="film-name">{film.name || ""}</p>
        <p className="film-year">Год: {film.year || ""}</p>
        <p>Рейтинги:</p>
        {Object.entries(film.rating).map(([rating, value]) => 
          value ? <p key={rating}>{rating}: {value}</p> : null
        )}
      </div>
    </div>
    ))}
    </div>
    </>
  )
}