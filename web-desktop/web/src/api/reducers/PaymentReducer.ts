import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import CardPayment from '../../interfaces/CardPayment';

const initialState = {
  data: {} as CardPayment,
  status: "idle",
  error: {},
};

export const payment =createAsyncThunk(
    '/payment',
    async ( {cardPayment,token }: {cardPayment: CardPayment,token : string | undefined | null} , thunkAPI ) => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/payment`,{
        userId: cardPayment.userId,
        offerId: cardPayment.offerId,
      },{
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

  export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
      .addCase(payment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(payment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error={}
      })
      .addCase(payment.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
    }
  });

  export default paymentSlice.reducer;