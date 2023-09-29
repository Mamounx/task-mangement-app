import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
// routes
import Router from './routes';
import ThemeProvider from './theme'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
