import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './Stores/storefile';
import Routing from './Components/Routing';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Provider store={store}>
        <Routing/>
    </Provider>,document.getElementById('root')
)