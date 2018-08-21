import {
  applyMiddleware,
  compose,
  createStore as reduxCreateStore
} from 'redux';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import rootReducer from './rootReducer';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const createStore = (
  initialState = {},
  history = createBrowserHistory()
) => {
  const store = reduxCreateStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
  );
  return { store, history };
};
