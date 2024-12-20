import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import axios from 'axios';
import { Toaster } from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

const theme = createTheme({
  typography: {
  fontFamily: "Roboto Serif, serif", 
  allVariants:{color: "white"},
  },
});

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
   <AuthProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Toaster position="top-right"/>
        <App />
      </ThemeProvider>
    </BrowserRouter>
    </AuthProvider> 
  </React.StrictMode>
);
