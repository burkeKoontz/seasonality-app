import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Announce from 'announce/Announce';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Announce />, document.getElementById('root'));
registerServiceWorker();
