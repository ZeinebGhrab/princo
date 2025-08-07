import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; 
import axios, { AxiosError } from 'axios';
import PendingFiles from '../../interfaces/PendingFiles';

const initialState = {
    data: [] as PendingFiles [],
    status: "idle", 
    error : {},
  };

  export const getPendingFiles = createAsyncThunk(
    '/getPendingFiles',
    async ( { id,skip, limit,token }: {id: string | null | undefined, skip: number, limit: number,token: string | null | undefined } , thunkAPI ) => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/pending-files/${id}?skip=${skip}&limit=${limit}`,{
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

  export const setPrintedPendingFile = createAsyncThunk(
    '/setPrintedPendingFile',
    async ( { id, token }: {id: string | null | undefined, token: string | null | undefined } , thunkAPI ) => {
    try{
      await axios.put(`${import.meta.env.VITE_SERVER_URL}/pending-files/${id}`,{},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  export const PendingFilesSlice = createSlice({
    name: 'pendingFiles',
    initialState,
    reducers: {
      setData: (state,action)=>{
        state.data= action.payload;
       }
    },
    extraReducers: (builder) => {
      builder
      .addCase(getPendingFiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPendingFiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getPendingFiles.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
      .addCase(setPrintedPendingFile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setPrintedPendingFile.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(setPrintedPendingFile.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
    }
});
export default PendingFilesSlice.reducer;