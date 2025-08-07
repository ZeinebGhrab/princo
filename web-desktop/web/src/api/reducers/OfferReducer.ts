import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Offer } from '../../interfaces/Offer';

const initialState = {
  data: [] as Offer [] | Offer ,
  status: "idle",
  error: {},
};

export const getOffers =createAsyncThunk(
    '/offers',
    async ( {skip, limit, token }: {skip: number, limit: number, token : string | undefined | null} , thunkAPI ) => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/offer?skip=${skip}&limit=${limit}`, {
        headers : {
            Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    }
    catch(error){
      console.log(error);
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

  export const getAdminOffers =createAsyncThunk(
    '/adminOffers',
    async ( {id, skip, limit, token }: {id: string | null | undefined, skip: number, limit: number, token : string | undefined | null} , thunkAPI ) => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/offer/admin/${id}?skip=${skip}&limit=${limit}`, {
        headers : {
            Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    }
    catch(error){
      console.log(error);
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

  export const getOffer =createAsyncThunk(
    '/offer',
    async ( {id, token }: {id: string | undefined | null, token : string | undefined | null} , thunkAPI ) => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/offer/${id}`, {
        headers : {
            Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    }
    catch(error){
      console.log(error);
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

  export const createOffer =createAsyncThunk(
    '/createOffer',
    async ( {offer, token }: {offer: Offer, token : string | undefined | null} , thunkAPI ) => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/offer`, 
      offer
      ,{
        headers : {
            Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    }
    catch(error){
      console.log(error);
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

  export const updateOffer =createAsyncThunk(
    '/updateOffer',
    async ( {id ,offer, token }: {id: string |null |undefined ,offer: Offer, token : string | undefined | null} , thunkAPI ) => {
    try{
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/offer/${id}`, 
      offer
      ,{
        headers : {
            Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    }
    catch(error){
      console.log(error);
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

  export const deleteOffer =createAsyncThunk(
    '/deleteOffer',
    async ( {id ,token }: {id: string |null |undefined ,token : string | undefined | null} , thunkAPI ) => {
    try{
      const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/offer/${id}`
      ,{
        headers : {
            Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    }
    catch(error){
      console.log(error);
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

  export const offerSlice = createSlice({
    name: 'offer',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
      .addCase(getOffers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOffers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error={}
      })
      .addCase(getOffers.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
      .addCase(getAdminOffers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAdminOffers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error={}
      })
      .addCase(getAdminOffers.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
      .addCase(getOffer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOffer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error={}
      })
      .addCase(getOffer.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
      .addCase(createOffer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOffer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error={}
      })
      .addCase(createOffer.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
      .addCase(updateOffer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOffer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error={}
      })
      .addCase(updateOffer.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
      .addCase(deleteOffer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteOffer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error={}
      })
      .addCase(deleteOffer.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
    }
  });

  export default offerSlice.reducer;