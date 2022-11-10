import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { createApplicationStore } from './app/application.store';
import { Router } from './router';

import './styles/global.scss';

export const App = () => {
  const store = createApplicationStore();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  );
};
