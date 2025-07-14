import { Link } from "react-router";
import { useState, useEffect } from 'react';

export function FavoritePage() {

  const [favoriteList, setFavoriteList] = useState<{id: number, name: string}[]>([]);

  useEffect(() => {
    const favorites: {id: number, name: string}[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      const value = sessionStorage.getItem(key);
      if (key && key.startsWith('favFilm-') && value) {
        try {
          const film = JSON.parse(value);
          favorites.push({id: film.id, name: film.name});
        }
        catch(err) {
          console.log('cant parse', err);
        }
      }
    }
    setFavoriteList(favorites);
  }, []);

  return (
    <>
    <Link to="/">Вернуться назад</Link>
    <h1>⭐ Избранные фильмы ⭐</h1>
    <ol>
      <>
      {favoriteList.map((film) => (
        <li key={film.id}>
          <Link to={`/film/${film.id}`}>{film.name}</Link>
        </li>
      ))}
      </>
    </ol>
    </>
  )
}