import { Link, useParams } from "react-router";
// import { useNavigate } from "react-router";
import { useState, useEffect} from "react";
import logo from  "../assets/kinopoisk_logo.png";
import styles from '../styles/filmPage.module.css';


interface Film {
  poster: {
    url: string,
    previewUrl: string
  },
  name: string,
  description: string,
  rating: {
    kp: number,
    imdb: number,
    tmdb: number,
    filmCritics: number,
    russianFilmCritics: number,
    await: number
  },
  year: number,
  genres: [
    {
      name: string
    }
  ],
}

export function FilmPage() {

  const [film, setFilm] = useState<Film | null>({
    poster: {
      url: logo,
      previewUrl: "#"
    },
    name: "test name",
    description: "test desc",
    rating: {
      kp: 23,
      imdb: 231,
      tmdb: 412,
      filmCritics: 312,
      russianFilmCritics: 421,
      await: 132
    },
    year: 2025,
    genres: [
      {
        name: "comedy"
      },
      {
        name: "action"
      },
      {
        name: "warfare"
      }
    ],
  }
  );

  const { id } = useParams<{id: string}>();

  const baseLink = `https://api.kinopoisk.dev/v1.4/movie/${id}`;

  useEffect(() => {
    if (id) {
      fetch(baseLink, {method: "GET", mode: "cors", headers: {"X-API-KEY": import.meta.env.VITE_API_KEY}})
      .then((response) => {
        if (response.status == 403) {
          console.log("API request expired for today");
          throw new Error(`api expired`)
        }
        if (!response.ok) {
          console.error(response.status)
          throw new Error(`error status: ${response.status}`)
        }
        return response.json();
      })
      .then((responseData) => {
          setFilm(responseData);
      })
      .catch((err) => console.error(err));
    }
  }, [id, baseLink])

  return (
    <>
    <Link to="/">Вернуться назад</Link>
    {film && 
      <div className={styles.filmDetailed}>
        <img src={film.poster.url || film.poster.previewUrl || logo} alt={`Фильм: ${film.name}`} className={styles.filmPoster}/>
        <div className={styles.filmInfo}>
          <h1>{film.name}</h1>
          <p>{film.description}</p>
          <p>Рейтинги: </p>
          <ul className={styles.ratingList}>
            {film.rating.kp && <li>Kp: {film.rating.kp}</li>}
            {film.rating.imdb && <li>Imdb: {film.rating.imdb}</li>}
            {film.rating.tmdb && <li>Tmdb: {film.rating.tmdb}</li>}
            {film.rating.filmCritics && <li>FilmCritics: {film.rating.filmCritics}</li>}
            {film.rating.russianFilmCritics && <li>RussianFilmCritics: {film.rating.russianFilmCritics}</li>}
            {film.rating.await && <li>Await: {film.rating.await}</li>}
          </ul>
          <p>Дата выхода: {film.year}</p>
          <p>Жанры: {film.genres.map((genre) => genre.name + ' ')}</p>
        </div>
      </div>
    }
    {!film && <p>Загружаем информацию о фильме...</p>}
    </>
  )
}