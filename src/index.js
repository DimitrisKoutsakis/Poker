import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App-redux';
import { Provider } from 'react-redux';
import {allReducers} from './models/poker';
import { createStore } from 'redux';

const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store = { store }>
        <App />
    </Provider>
    ,document.getElementById('root')
);