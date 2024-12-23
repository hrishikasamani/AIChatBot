import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import App from './App.tsx';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { Toast, Toaster } from 'react-hot-toast';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5001/api/v1";
axios.defaults.withCredentials = true;

const theme = createTheme({typography:{
  fontFamily: "Roboto Serif, serif", 
  allVariants:{color: "white"},
},
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
   <AuthProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Toaster position='top-right'/>
        <App />
      </ThemeProvider>
    </BrowserRouter>
    </AuthProvider> 
  </React.StrictMode>
);
