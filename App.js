import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import placesReducer from './store/reducers/placesReducers';
import PlacesNavigator from "./navigation/PlacesNavigation";
import {init} from './helpers/db';

init().then(() => {
    console.log('db initialized');
}).catch((err) => {
   console.log('initial db fail');
});

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {
  return (
      <Provider store={store}>
        <PlacesNavigator/>
      </Provider>
    );
}

const styles = StyleSheet.create({

});
