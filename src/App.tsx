import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react';

import configureStore, { history } from './store';
import AppRouter from './router';

const { persistor, store } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <AppRouter />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
