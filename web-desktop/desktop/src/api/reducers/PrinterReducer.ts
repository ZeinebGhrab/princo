import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ipcRenderer } from 'electron';
import Printer from '../../interfaces/Printer';

interface PrinterState {
  data: Printer[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PrinterState = {
  data: [],
  status: 'idle',
  error: null,
};

export const detectPrinters = createAsyncThunk(
  'printers/detectPrinters',
  async () => {
    try {
      const response = await ipcRenderer.invoke('getPrinters');
      const formattedPrinters = response.map((printer: { name: unknown; }) => ({
        label: printer.name,
        value: printer.name,
      }));
      return formattedPrinters;
    } catch (error) {
      console.error('Erreur lors de la récupération des imprimantes : ', error);
      throw error;
    }
  }
);

export const printTestPage = createAsyncThunk(
    'printers/printTestPage',
    async ({ printerName, pdfBase64}: { printerName: string, pdfBase64: string}) => {
        try {
            const printResult = await ipcRenderer.invoke('printTestPage', printerName, pdfBase64);
            if (printResult) {
              console.log('La page a été imprimée avec succès !');
            } else {
              console.error("Erreur lors de l'impression.");
            }
          } catch (error) {
            console.error("Erreur lors de l'appel de l'impression:", error);
          }
    }
  );

  export const downloadPage = createAsyncThunk(
    'printers/downloadPage',
    async ({ pdfBase64}: { pdfBase64: string}) => {
        try {
            const downloadResult = await ipcRenderer.invoke('downloadPdf', pdfBase64);
            if (downloadResult) {
              console.log('La page a été téléchargée avec succès !');
            } else {
              console.error("Erreur lors de téléchargement.");
            }
          } catch (error) {
            console.error("Erreur lors de l'appel de téléchargement:", error);
          }
    }
  );

export const printersSlice = createSlice({
  name: 'printers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(detectPrinters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(detectPrinters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(detectPrinters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erreur survenue';
      })
      .addCase(printTestPage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(printTestPage.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(printTestPage.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(downloadPage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(downloadPage.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(downloadPage.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default printersSlice.reducer;

