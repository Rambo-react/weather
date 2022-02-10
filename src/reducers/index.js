import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import weatherReducer from './weatherReducer';
import positionReducer from './positionReducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
  geoposition: positionReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
