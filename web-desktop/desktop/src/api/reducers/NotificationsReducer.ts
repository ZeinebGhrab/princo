import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Notif from "../../interfaces/notifications/ImpressionNotif ";
import CreateNotification from "../../interfaces/notifications/CreateNotification";

const initialState = {
    data: [] as Notif[],
    status: "idle", 
    error : {},
  };

  export const getNotifications= createAsyncThunk(
    '/getnotifications',
    async ( { id,skip, limit,token }: {id: string | null | undefined, skip: number, limit: number,token: string | null | undefined } , thunkAPI ) => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/notification/${id}?skip=${skip}&limit=${limit}`,{
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

  export const createNotification = createAsyncThunk(
    '/createNotification',
    async ( { notification, token }: {notification: CreateNotification, token: string | null | undefined  } , thunkAPI ) => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/notification`,notification,{
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

  export const notificationsSlice = createSlice({
    name: 'notifcations',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
      .addCase(getNotifications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
      .addCase(createNotification.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(createNotification.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
    }
});
export default notificationsSlice.reducer;