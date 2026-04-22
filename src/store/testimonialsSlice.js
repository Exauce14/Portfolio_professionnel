import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTestimonials = createAsyncThunk('testimonials/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/testimonials');
    return res.data;
  } catch (err) {
    return rejectWithValue('Erreur lors du chargement des témoignages');
  }
});

export const addTestimonial = createAsyncThunk('testimonials/add', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post('/api/testimonials', data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Erreur lors de l\'ajout');
  }
});

export const updateTestimonial = createAsyncThunk('testimonials/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await axios.put(`/api/testimonials/${id}`, data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Erreur lors de la modification');
  }
});

export const deleteTestimonial = createAsyncThunk('testimonials/delete', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/api/testimonials/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue('Erreur lors de la suppression');
  }
});

export const approveTestimonial = createAsyncThunk('testimonials/approve', async ({ id, approved }, { rejectWithValue }) => {
  try {
    const res = await axios.patch(`/api/testimonials/${id}`, { approved });
    return res.data;
  } catch (err) {
    return rejectWithValue('Erreur lors de l\'approbation');
  }
});

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState: { list: [], loading: false, error: null, success: null },
  reducers: {
    clearMessages(state) { state.error = null; state.success = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => { state.loading = true; })
      .addCase(fetchTestimonials.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
      .addCase(fetchTestimonials.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(addTestimonial.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
        state.success = 'Témoignage ajouté avec succès !';
      })
      .addCase(addTestimonial.rejected, (state, action) => { state.error = action.payload; })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        const idx = state.list.findIndex(t => t.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
        state.success = 'Témoignage modifié avec succès !';
      })
      .addCase(updateTestimonial.rejected, (state, action) => { state.error = action.payload; })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.list = state.list.filter(t => t.id !== action.payload);
      })
      .addCase(approveTestimonial.fulfilled, (state, action) => {
        const idx = state.list.findIndex(t => t.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      });
  },
});

export const { clearMessages } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
