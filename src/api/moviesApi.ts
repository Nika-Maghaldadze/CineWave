import axiosClient from '@/api/axiosClient';
import type {
  Genre,
  Movie,
  MovieDetails,
  PaginatedResponse,
} from '@/types/movie';

export const getTrending = async (page = 1): Promise<Movie[]> => {
  const { data } = await axiosClient.get<PaginatedResponse<Movie>>(
    '/trending/movie/week',
    { params: { page } },
  );
  return data.results;
};

export const getPopular = async (
  page = 1,
): Promise<PaginatedResponse<Movie>> => {
  const { data } = await axiosClient.get<PaginatedResponse<Movie>>(
    '/movie/popular',
    { params: { page } },
  );
  return data;
};

export const getMoviesByGenre = async (
  genreId: number,
  page = 1,
): Promise<PaginatedResponse<Movie>> => {
  const { data } = await axiosClient.get<PaginatedResponse<Movie>>(
    '/discover/movie',
    { params: { with_genres: genreId, sort_by: 'popularity.desc', page } },
  );
  return data;
};

export const searchMovies = async (
  query: string,
  page = 1,
): Promise<PaginatedResponse<Movie>> => {
  const { data } = await axiosClient.get<PaginatedResponse<Movie>>(
    '/search/movie',
    { params: { query, page, include_adult: false } },
  );
  return data;
};

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  const { data } = await axiosClient.get<MovieDetails>(`/movie/${id}`, {
    params: { append_to_response: 'videos,credits,similar' },
  });
  return data;
};

export const getGenres = async (): Promise<Genre[]> => {
  const { data } = await axiosClient.get<{ genres: Genre[] }>(
    '/genre/movie/list',
  );
  return data.genres;
};
