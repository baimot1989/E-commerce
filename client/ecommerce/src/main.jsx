import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
// import './index.css'

//redux
// import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.js'
// import reducer from './redux/rootReducer.js';


import App from './App.jsx'
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>

  </StrictMode>,
)
