import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter} from "react-router-dom";
import App from './App';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <App />

    </BrowserRouter>

    ,
  document.getElementById('root')
);
