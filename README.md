# 🎬 CineWave

A movie discovery web app built with **React + TypeScript + Vite**. Browse trending
and popular films, search the TMDB catalogue, filter by genre, watch trailers in a
modal, and save favorites — with a dark/light theme and Georgian/English UI.

> BTU final project. Built entirely with functional components and hooks.

---

## ✨ Features

- **3+ pages** with client-side routing (Home, Movie details, Favorites, 404)
- **Live data** from the [TMDB API](https://www.themoviedb.org/) via a centralized Axios client
- **Search** with debounce + **genre filtering**
- **Favorites** persisted in `localStorage`; last search kept in `sessionStorage`
- **Trailer modal** (YouTube embed) with backdrop / Escape close
- **Dark / Light theme** (remembered across visits)
- **Bilingual UI** — ქართული 🇬🇪 / English 🇬🇧 (react-i18next)
- **Animations** with Framer Motion (page transitions, hover, staggered grids, modal)
- **Fully responsive** — works from 320px phones up to large desktops
- **SCSS Modules** with shared variables / mixins / theme tokens

## 🧰 Tech stack

| Area | Tool |
|------|------|
| Build | Vite |
| UI | React 18 (function components + hooks) |
| Language | TypeScript |
| Routing | react-router-dom v6 |
| Data | Axios + TMDB API |
| Styling | SCSS Modules |
| i18n | i18next / react-i18next |
| Animation | Framer Motion |
| State | Context API + custom hooks |

---

## 🚀 Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. (Optional) Use your own TMDB API key

The app ships with a shared demo key, so it works right after cloning — no setup
needed. To use your own key, create a free account at
[themoviedb.org](https://www.themoviedb.org/settings/api), copy `.env.example` to
`.env`, and paste your key (this overrides the demo key):

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

### 3. Run

```bash
npm run dev      # start dev server (http://localhost:5173)
npm run build    # type-check + production build
npm run preview  # preview the production build
```

---

## 📁 Project structure

```
src/
├─ api/            # Axios instance + TMDB service functions
├─ components/
│  ├─ common/      # Navbar, Footer, Modal, Loader, ThemeToggle, LanguageSwitcher, ...
│  └─ movies/      # MovieCard, MovieGrid, SearchBar, GenreFilter, TrailerModal
├─ context/        # ThemeContext, FavoritesContext
├─ hooks/          # useLocalStorage, useDebounce, useFetch
├─ i18n/           # i18next config + en/ka locale files
├─ layouts/        # MainLayout (navbar + outlet + footer)
├─ pages/          # Home, MovieDetails, Favorites, NotFound
├─ router/         # AppRouter (lazy-loaded routes)
├─ styles/         # _variables, _mixins, _themes, global.scss
├─ types/          # shared TypeScript interfaces
└─ utils/          # constants + URL helpers
```

---

## ✅ Requirements coverage

| Requirement | Where |
|-------------|-------|
| Functional components | entire `src/` |
| React Hooks | `useState/useEffect/useContext/useMemo/useCallback` + custom hooks in `src/hooks` |
| React Router | `src/router/AppRouter.tsx`, `src/layouts/MainLayout.tsx` |
| API integration | `src/api/axiosClient.ts`, `src/api/moviesApi.ts` |
| Storage | `src/hooks/useLocalStorage.ts` (favorites, theme, language) + `sessionStorage` (last search) |
| Responsive | `src/styles/_mixins.scss` breakpoints + CSS Grid |
| Animations / modals | Framer Motion + `src/components/common/Modal` |
| **Bonus:** SCSS | SCSS Modules throughout |
| **Bonus:** Dark/Light | `src/context/ThemeContext.tsx` + `_themes.scss` |
| **Bonus:** Multi-language | `src/i18n` (ka / en) |
| **Bonus:** TypeScript | whole project |
| **Bonus:** extra React | Context API, lazy/Suspense, custom hooks |

---

Movie data and images provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).
This product uses the TMDB API but is not endorsed or certified by TMDB.
