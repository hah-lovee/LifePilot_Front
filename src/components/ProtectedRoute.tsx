
import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@state/auth'

export const ProtectedRoute: React.FC = () => {
  const { isAuthed } = useAuth()
  const location = useLocation()
  if (!isAuthed) return <Navigate to="/login" state={{ from: location }} replace />
  return <Outlet />
}
