import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import AppRouter from '@/router/AppRouter';

export default function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
