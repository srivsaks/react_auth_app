import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import {AuthConextProvider} from "../src/store/auth-context";

ReactDOM.render(
  <AuthConextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </AuthConextProvider>,
  document.getElementById('root')
);
