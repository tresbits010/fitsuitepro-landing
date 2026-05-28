import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import GymProfile from './GymProfile';
import TermsOfService from './TermsOfService'; // Asegurate de importar tu nuevo archivo

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/gyms/:gymSlug" element={<GymProfile />} />
        
        <Route path="/terminos" element={<TermsOfService />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)