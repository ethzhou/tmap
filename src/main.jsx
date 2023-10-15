import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Route, Routes,
} from "react-router-dom";
import App from './App.jsx';
import './index.postcss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path='tmap/*' element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
