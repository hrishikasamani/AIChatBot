import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.tsx';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';

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
        <App />
      </ThemeProvider>
    </BrowserRouter>
    </AuthProvider> 
  </React.StrictMode>
);
