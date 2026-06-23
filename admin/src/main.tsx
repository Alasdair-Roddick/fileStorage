import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Admin from './pages/admin/page.tsx'
import AddUserPage from './pages/add-user/page.tsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Sidebar from './components/sidebar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex h-screen bg-neutral-100 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="/add-user" element={<AddUserPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  </StrictMode>,
)
