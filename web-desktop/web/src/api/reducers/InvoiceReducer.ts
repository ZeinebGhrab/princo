import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import Invoice from '../../interfaces/Invoice';
import download from 'downloadjs';
import { errorNetwork } from '../../../../sharedComponent/helpers/ErrorMsg';

const initialState = {
  data: [] as Invoice [] | null ,
  status: "idle",
  error: {},
};

export const getInvoices =createAsyncThunk(
    '/invoices',
    async ( {id, skip, limit, token }: {id: string | null | undefined,skip: number, limit: number, token : string | undefined | null} , thunkAPI ) => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/invoice/${id}?skip=${skip}&limit=${limit}`, {
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
          return thunkAPI.rejectWithValue({message : errorNetwork});
        }
        return thunkAPI.rejectWithValue(error.response.data);
      } 
      throw error;
    }
    }
  );

  export const downloadInvoice =createAsyncThunk(
    '/downloadInvoice',
    async ( {invoicePath, token, ref }: {invoicePath: string | null | undefined,token : string | undefined | null, ref: string | null | undefined} , thunkAPI ) => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/${invoicePath}`, {
        headers : {
            Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
      download(response.data, `'Facture${ref}.pdf`, 'application/pdf');
      return response.data;
    }
    catch(error){
      console.log(error);
      if (error instanceof AxiosError && error.response) {
        if (error.code === 'ERR_NETWORK') {
          return thunkAPI.rejectWithValue({message : errorNetwork});
        }
        return thunkAPI.rejectWithValue(error.response.data);
      } 
      throw error;
    }
    }
  );

  

  export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
      .addCase(getInvoices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getInvoices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error={}
      })
      .addCase(getInvoices.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
      .addCase(downloadInvoice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(downloadInvoice.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error={}
      })
      .addCase(downloadInvoice.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
    }
  });

  export default invoiceSlice.reducer;