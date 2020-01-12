import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppNavigation from './navigation/AppNavigation';
import store from './store';

/*
  step 1: import Provider:
    provider = a react component that accepts a Redux store
    as a prop. Then the Provider makes the store ACCESSIBLE
    to all child components. I.e. PROVIDES it to all child 
    components.

  step 2: create a store (in a seperate file)
  step 3: create reducers (in a seperate file)
  step 4: create root Provider tag, and pass it the store.
*/
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}

export default App;
