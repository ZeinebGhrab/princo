import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import io from 'socket.io-client'; 
import AuthState from '../../interfaces/user/AuthState';


const socket = io(`${import.meta.env.VITE_SERVER_URL}`);

const initialState = {
  data: {} as AuthState | null ,
  auth: false,
  status: "idle",
  error: {},
};

export const authenticateUser = createAsyncThunk(
  'auth/login',
  async ({ email, password, rememberMe }: { email: string, password: string, rememberMe: boolean }, thunkAPI) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, { email, password, rememberMe });
      socket.emit('desktopAppConnected', response.data.id);

      thunkAPI.dispatch(setData(response.data));
    } catch (error) {
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

export const logout = createAsyncThunk(
  'auth/logout',
  async (userId: string | null | undefined) => {
    try {
      socket.emit('desktopAppDisconnected', userId);
      await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth/logout`);
      
    } catch (error) {
      return error;
    }
  }
);

export const authentificationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.auth = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(authenticateUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = {}
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
        state.data = null;
        state.auth = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'succeeded';
        state.data = null;
        state.auth = false;
        state.error={};
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
  }
});

export const { setData } = authentificationSlice.actions;
export default authentificationSlice.reducer;
