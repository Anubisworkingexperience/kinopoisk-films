import { useState } from "react";
import { useEffect} from "react";
import styles from '../styles/catalog.module.css';
import logo from  "../assets/kinopoisk_logo.png";
// import { makeAutoObservable } from "mobx";
import { useNavigate } from "react-router";

interface Genre {
  name: string
}

export function FilmList() {

  const [genres, setGenres] = useState<Genre[]>([]);

  const navigate = useNavigate();

  const allGenres: string[] = [];

  for (let i = 0; i < genres.length; i++) {
    allGenres.push(genres[i].name);
  }

  console.log(allGenres)

  const [films, setFilms] = useState([
    {
      id: 22,
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
    },
    {
      id: 222,
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
    },
    {
      id: 226,
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
    },
    
  ]);

  const baseLink = `https://api.kinopoisk.dev/v1.4/movie/random`;

  useEffect(() => {

    const fetchData = () => {
      fetch(baseLink, {method: "GET", mode: "cors", headers: {"X-API-KEY": import.meta.env.VITE_API_KEY}})
    .then((response => response.json()))
    .then((response => {
      const newFilm = {
        id: response.id,
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
        },
          genres: [
            {
              name: "string"
            }
          ],
      }
      setFilms((prevFilms) => [...prevFilms, newFilm]);
      setGenres((prevGenres) => [...prevGenres, ...newFilm.genres])
      
    }
    ))
    .catch((error) => console.error(error));
    }

    let fetchingFilms : boolean = false;

    const addFilmsOnScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;

    if (scrollTop + windowHeight >= documentHeight - 100 && !fetchingFilms) {
      fetchingFilms = true;

      Promise.all([fetchData()]).then(() => {
        fetchingFilms = false;
      });
    }
    }

    window.addEventListener('scroll', addFilmsOnScroll);
 
    for (let i = 0; i < 5; i++) {
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
      <div className={styles.film} key={index} onClick={() => navigate(`/film/${film.id}`)}>
      <img src={film.poster.url || film.poster.previewUrl || logo} alt={`Фильм: ${film.name || 'loading...'}`} className={styles.filmPoster}/>
      <div className={styles.filmInfo}>
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