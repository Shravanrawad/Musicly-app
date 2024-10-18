import { configureStore } from '@reduxjs/toolkit';
import songReducer from '../redux/songSlice'; 
import searchReducer from '../redux/searchSlice'

const store = configureStore({
  reducer: {
    songlist: songReducer,
    search: searchReducer
  },
});

export default store;
