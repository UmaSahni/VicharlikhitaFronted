import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider,  } from '@chakra-ui/react'
import App from './App';
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvier from './Context/AuthContext';






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvier>
  <BrowserRouter>
  <ChakraProvider theme={theme} >
    <App />
  </ChakraProvider>
  </BrowserRouter>
  </AuthContextProvier>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

