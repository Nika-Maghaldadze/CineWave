import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Loader from '@/components/common/Loader/Loader';

const Home = lazy(() => import('@/pages/Home/Home'));
const MovieDetails = lazy(() => import('@/pages/MovieDetails/MovieDetails'));
const Favorites = lazy(() => import('@/pages/Favorites/Favorites'));
const NotFound = lazy(() => import('@/pages/NotFound/NotFound'));

export default function AppRouter() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
