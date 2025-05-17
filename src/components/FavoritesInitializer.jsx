import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadFavoritesFromStorage } from '../store/favoritesSlice';

function FavoritesInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load favorites from localStorage when component mounts
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        dispatch(loadFavoritesFromStorage(parsedFavorites));
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
        localStorage.removeItem('favorites'); // Clear invalid data
      }
    }
  }, [dispatch]);

  return null; // This component doesn't render anything
}

export default FavoritesInitializer; 