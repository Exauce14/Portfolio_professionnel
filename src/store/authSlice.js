import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Écrit un cookie avec une durée de vie en jours (SameSite=Lax pour la compatibilité navigateur)
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

// Expire le cookie immédiatement en reculant la date d'expiration dans le passé
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Thunk : connexion — stocke le token dans localStorage ET dans un cookie
// Le cookie est lu par le middleware Next.js côté serveur pour protéger les routes
export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const res = await axios.post('/api/auth/login', credentials);
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setCookie('token', res.data.token, 7);
    }
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Erreur de connexion');
  }
});

// Thunk : inscription — ne connecte pas automatiquement, redirige vers /login après succès
export const registerUser = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post('/api/auth/register', data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Erreur d\'inscription');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:    null,
    token:   null,
    loading: false,
    error:   null,
    success: null,
  },
  reducers: {
    // Vide l'état et supprime toutes les traces de session (localStorage + cookie)
    logout(state) {
      state.user  = null;
      state.token = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        deleteCookie('token');
      }
    },

    // Restaure la session depuis localStorage au montage de l'app (voir ReduxProvider)
    // Renouvelle aussi le cookie pour que le middleware continue de fonctionner
    loadFromStorage(state) {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        const user  = localStorage.getItem('user');
        if (token && user) {
          state.token = token;
          state.user  = JSON.parse(user);
          setCookie('token', token, 7);
        }
      }
    },

    clearMessages(state) {
      state.error   = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token   = action.payload.token;
        state.user    = action.payload.user;
      })
      .addCase(loginUser.rejected,  (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(registerUser.pending,   (state) => { state.loading = true; state.error = null; state.success = null; })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = 'Compte créé avec succès ! Vous pouvez vous connecter.';
      })
      .addCase(registerUser.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { logout, loadFromStorage, clearMessages } = authSlice.actions;
export default authSlice.reducer;
