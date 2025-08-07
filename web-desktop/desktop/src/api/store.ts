import { authentificationSlice } from './reducers/AuthReducer';
import { configureStore } from '@reduxjs/toolkit';
import { connectorsSlice } from './reducers/ConnectorsReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { printersSlice } from './reducers/PrinterReducer';
import { notificationsSlice } from './reducers/NotificationsReducer';
import { PendingFilesSlice } from './reducers/PendingFilesReducer';


const persistConfig = {
  key: 'root',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authentificationSlice.reducer);

export const store = configureStore({
    reducer: {
      auth: persistedAuthReducer,
      connectors : connectorsSlice.reducer,
      printers: printersSlice.reducer,
      notifications: notificationsSlice.reducer,
      pendingFiles: PendingFilesSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      if (process.env.NODE_ENV === 'development') {
        return getDefaultMiddleware({
          serializableCheck: false, 
        });
      }
      return getDefaultMiddleware();
    },
  });
  
  export const persistor = persistStore(store);
  export type AppDispatch = typeof store.dispatch
  export type RootState = ReturnType<typeof store.getState>
  export default store;