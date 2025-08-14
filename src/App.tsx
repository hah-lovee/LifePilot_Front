
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { NavBar } from '@components/NavBar'
import { ProtectedRoute } from '@components/ProtectedRoute'
import Login from '@pages/Login'
import Dashboard from '@pages/Dashboard'
import ReportsDaily from '@pages/ReportsDaily'
import Domains from '@pages/Domains'
import Crypto from '@pages/Crypto'
import Settings from '@pages/Settings'
import NotFound from '@pages/NotFound'
import { AuthProvider } from '@state/auth'
import Register from '@pages/Register'

export default function App() {
  return (
    <AuthProvider>
      <div style={{display:'flex', minHeight:'100vh'}}>
        <NavBar />
        <main className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="/reports/daily" element={<ReportsDaily />} />
              <Route path="/domains" element={<Domains />} />
              <Route path="/crypto" element={<Crypto />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}
