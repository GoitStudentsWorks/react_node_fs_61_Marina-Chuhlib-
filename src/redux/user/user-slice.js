import { createSlice } from '@reduxjs/toolkit';

import {
  fetchUser,
  fetchUpdateUser,
  fetchUpdateAvatar,
  fetchDeleteUserPet,
} from './user-operations';

const initialState = {
  user: {
    pets: [{}],
    name: '',
    email: '',
    birthday: '',
    phone: '',
    city: '',
    imageURL: '',
  },
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(fetchUpdateUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user.user = payload;
        state.error = null;
      })
      .addCase(fetchUpdateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(fetchUpdateAvatar.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUpdateAvatar.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user.user = payload.user;
        state.error = null;
      })
      .addCase(fetchUpdateAvatar.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(fetchDeleteUserPet.pending, store => {
        store.isLoading = true;
      })
      .addCase(fetchDeleteUserPet.fulfilled, (store, { payload }) => {
        store.isLoading = false;
        const index = store.pets.findIndex(pet => pet.id === payload);
        store.items.splice(index, 1);
      })
      .addCase(fetchDeleteUserPet.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.error = payload;
      });
  },
});

export default userSlice.reducer;
