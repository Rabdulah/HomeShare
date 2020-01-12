import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const store = createStore(
  reducers,
  {}, // default state 
  compose( // Compose is used when you want to pass multiple store enhancers to the store
    applyMiddleware(thunk) // wire up middleware (which is thunk)
  )
);

export default store;