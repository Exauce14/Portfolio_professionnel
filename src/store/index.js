import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import projectsReducer from './projectsSlice';
import testimonialsReducer from './testimonialsSlice';

// Store Redux central — chaque slice gère une section de l'état global
export const store = configureStore({
  reducer: {
    auth:         authReducer,         // utilisateur connecté, token
    projects:     projectsReducer,     // liste et détail des projets
    testimonials: testimonialsReducer, // liste des témoignages
  },
});
