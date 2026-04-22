import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProjects = createAsyncThunk('projects/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/projects');
    return res.data;
  } catch (err) {
    return rejectWithValue('Erreur lors du chargement des projets');
  }
});

export const fetchProjectById = createAsyncThunk('projects/fetchOne', async (id, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/api/projects/${id}`);
    return res.data;
  } catch (err) {
    return rejectWithValue('Projet non trouvé');
  }
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: { list: [], current: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProjects.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
      .addCase(fetchProjects.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchProjectById.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProjectById.fulfilled, (state, action) => { state.loading = false; state.current = action.payload; })
      .addCase(fetchProjectById.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default projectsSlice.reducer;
