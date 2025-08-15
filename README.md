# Приложение для просмотра информации о фильмах с использованием Кинопоиск API

## Запуск приложения

1. Создайте локальную копию репозитория

```bash
git clone https://github.com/Anubisworkingexperience/kinopoisk-films.git
cd kinopoisk-films
```

2. Установите зависимости
```bash
npm install
```

3. Получите свой API ключ

Получите API ключ по инструкции в документации API

[Ссылка на документацию](https://api.kinopoisk.dev/documentation)

4. Используйте свой API ключ в файле .env

```bash
cp .env.default .env
```
Откройте файл .env и используйте свой API ключ

```dotenv
VITE_API_KEY=<ваш api ключ>
```

5. Запустите приложение

```bash
npm run dev
```


