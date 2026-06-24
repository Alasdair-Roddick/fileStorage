import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Admin from './pages/admin/page.tsx'
import AddUserPage from './pages/add-user/page.tsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Sidebar from './components/sidebar.tsx'
import { ClerkProvider, SignIn, RedirectToSignIn, Show } from '@clerk/react'

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/sign-in">
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in/*" element={
            <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
              <SignIn routing="path" path="/sign-in" />
            </div>
          }/>
          <Route path="/*" element={
            <>
              <Show when="signed-in">
                <div className="flex h-screen bg-neutral-100 overflow-hidden">
                  <Sidebar />
                  <main className="flex-1 overflow-auto">
                    <Routes>
                      <Route path="/" element={<Admin />} />
                      <Route path="/add-user" element={<AddUserPage />} />
                    </Routes>
                  </main>
                </div>
              </Show>
              <Show when="signed-out">
                <RedirectToSignIn />
              </Show>
            </>
          }/>
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)
