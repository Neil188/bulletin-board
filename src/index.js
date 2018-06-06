import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Board from './components/Board';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Board />, document.getElementById('root'));
registerServiceWorker();
