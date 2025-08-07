import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@piximind/ds-p-23/lib/main.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './api/store.ts';
import { BrowserRouter } from 'react-router-dom';
import './main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
           <App/>
        </BrowserRouter> 
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
