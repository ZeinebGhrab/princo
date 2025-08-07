import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './src/App.tsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@piximind/ds-p-23/lib/main.css'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './src/api/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
           <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
