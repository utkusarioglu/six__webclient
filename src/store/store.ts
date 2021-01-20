import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './root.reducer';

const middleware = [thunk];

/** Used for chrome web dev */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * The actual store for the app
 */
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
