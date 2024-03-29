import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import weatherReducer from './weatherReducer';
import positionReducer from './positionReducer';
import todoReducer from './todoReducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
  geoposition: positionReducer,
  todo: todoReducer,
});

const persistConfig = {
  key: 'rootReducer',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// eslint-disable-next-line prefer-const
let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

// eslint-disable-next-line prefer-const
let persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export default { store, persistor };
