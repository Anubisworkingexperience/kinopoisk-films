import { useState } from "react";
import { useEffect } from "react";

export function FilmList() {

  const [filmInfo, setFilmInfo] = useState({
    poster: {
    url: "string",
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
  });

  const baseLink = `https://api.kinopoisk.dev/v1.4/movie/random`;

  useEffect(() => {
    fetch(baseLink, {method: "GET", mode: "cors", headers: {"X-API-KEY": import.meta.env.VITE_API_KEY}})
    .then((response => response.json()))
    .then((response => setFilmInfo({
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

    })))
    .catch((error) => console.error(error));
  }, [baseLink])

  return (
    <>
    <h1>Список фильмов</h1>
    <div className="films">
      <div className="film">
        <img src={filmInfo.poster.url} alt="poster" />
        <p className="film-name">{filmInfo.name}</p>
        <p className="fil-year">Год: {filmInfo.year}</p>
        <p>Рейтинги:</p>
        {Object.entries(filmInfo.rating).map(([rating, value]) => (
          value ? <p key={rating}>Рейтинг {rating}: {value}</p> : null
        ))}
      </div>
    </div>
    </>
  )
}