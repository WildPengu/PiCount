import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import type { IModuleStore } from 'redux-dynamic-modules-core';
import { createStore } from 'redux-dynamic-modules-core';
import App from './app/App';
import { UsersModule } from './stores/userModule';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store: IModuleStore<unknown> = createStore(
  {
    initialState: {},
    extensions: [],
  },
  UsersModule
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
  </StrictMode>
);
