'use client';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { useEffect } from 'react';
import { loadFromStorage } from '@/store/authSlice';

// Composant interne monté une seule fois pour restaurer la session depuis localStorage
// Séparé de ReduxProvider pour pouvoir utiliser useEffect à l'intérieur du Provider
function StorageLoader() {
  useEffect(() => {
    store.dispatch(loadFromStorage());
  }, []);
  return null;
}

// Enveloppe toute l'application dans le store Redux et recharge la session au démarrage
export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <StorageLoader />
      {children}
    </Provider>
  );
}
