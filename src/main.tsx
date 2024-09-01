import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';
import './i18n'
// import dotenv from 'dotenv';
// dotenv.config();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
    <Router>
      <App />
    </Router>
  
);
