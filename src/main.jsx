import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './pages/Login.jsx'
import LoginPage from './pages/Login.jsx'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cards from './pages/Cards.jsx'
import Newform from './pages/Newform.jsx'
import JobForm from './pages/JobForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
       <Route path="/cards" element={<Cards />} />
       <Route path="/form/Sports" element={<Newform/>}/>
       <Route path="form/Jobs" element={<JobForm/>}/>
      </Routes>
    </Router>
  </StrictMode>,
)
