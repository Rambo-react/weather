import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import reduxStore from './redux/store';

ReactDOM.render(
  <Provider store={reduxStore.store}>
    <div>
      <PersistGate loading={null} persistor={reduxStore.persistor}>
        <App />
      </PersistGate>
    </div>
  </Provider>,
  document.getElementById('root'),
);
