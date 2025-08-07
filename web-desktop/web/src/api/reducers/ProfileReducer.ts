import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import User from "../../interfaces/user/User";

const initialState = {
    data:{} as User ,
    status: "idle", 
    error : {},
  };

  export const getUser = createAsyncThunk(
    '/getUser',
    async ( { id ,token }: {id: string | null | undefined ,token: string | null | undefined } , thunkAPI ) => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
    catch(error){
      if (error instanceof AxiosError && error.response) {
        if (error.code === 'ERR_NETWORK') {
          return thunkAPI.rejectWithValue({message : 'Erreur de connexion: Veuillez vérifier votre connexion internet.'});
        }
        return thunkAPI.rejectWithValue(error.response.data);
      } 
      throw error;
    }
    }
  );

  export const updateUser = createAsyncThunk(
    '/updateUser',
    async ({ id, updateUser, token }: { id: string | null | undefined, updateUser: Partial<User> | null | undefined, token: string | null | undefined }, thunkAPI) => {
      try {
        await axios.put(`${import.meta.env.VITE_SERVER_URL}/users/${id}`,
         updateUser, { headers: { Authorization: `Bearer ${token}` } });
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          if (error.code === 'ERR_NETWORK') {
            return thunkAPI.rejectWithValue({message : 'Erreur de connexion: Veuillez vérifier votre connexion internet.'});
          }
          return thunkAPI.rejectWithValue(error.response.data);
        }
        throw error;
      }
    }
  );
  export const updateProfileImage = createAsyncThunk(
    '/updateProfileImage',
    async ({ id, file, token }: { id: string | null | undefined, file: File | null | undefined, token: string | null | undefined }, thunkAPI) => {
      try {
        await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/upload/${id}`,
         {file}, 
         {
           headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
         } 
        });
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          if (error.code === 'ERR_NETWORK') {
            return thunkAPI.rejectWithValue({message : 'Erreur de connexion: Veuillez vérifier votre connexion internet.'});
          }
          return thunkAPI.rejectWithValue(error.response.data);
        }
        throw error;
      }
    }
  );
  export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
    }
});

export default profileSlice.reducer;