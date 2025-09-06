import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './style/theme.css';  
import App from './App';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes';
import { ThemeProvider } from './context/ThemeContext';
import axios from 'axios';
import { PostsProvider } from './components/PostaContext/PostaContext';

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(
  document.getElementById('root') 
);
root.render(
  <React.StrictMode>
  <ThemeProvider>
    <PostsProvider>   
    <RouterProvider router={router} />
     </PostsProvider>
  </ThemeProvider>
</React.StrictMode>
);
