import axios from 'axios';
import { TMDB_BASE_URL } from '@/utils/constants';

// Shared demo key so the app works right after cloning, without any setup.
// Override it locally by setting VITE_TMDB_API_KEY in a .env file.
const FALLBACK_TMDB_API_KEY = '73c4ed62d4646552c4b439ce993cea3d';
const envKey = import.meta.env.VITE_TMDB_API_KEY;
const apiKey =
  envKey && envKey !== 'your_tmdb_api_key_here' ? envKey : FALLBACK_TMDB_API_KEY;

const axiosClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: apiKey,
    language: 'en-US',
  },
});

export default axiosClient;
