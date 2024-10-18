import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchSongs = createAsyncThunk(
  'search/searchSongs',
  async ({ query, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: query,
          type: 'track',
          limit: 20,
        },
      });
      return response.data.tracks.items;
    } catch (error) {
      console.error('Error fetching search results:', error);
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    status: 'idle', 
    error: null,
  },
  reducers: {
    clearResults: (state) => {
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchSongs.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(searchSongs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload;
      })
      .addCase(searchSongs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearResults } = searchSlice.actions;
export default searchSlice.reducer;
