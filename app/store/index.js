import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import Reducer from '../reducers';

const store = createStore(
    Reducer,
    {},
    compose(
        applyMiddleware(thunk),
    )
);

export default store;