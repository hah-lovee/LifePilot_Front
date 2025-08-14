
import React, { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
  isAuthed: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => { const t = localStorage.getItem('lp_token'); if (t) setToken(t) }, [])

  const login = (t: string) => { setToken(t); localStorage.setItem('lp_token', t) }
  const logout = () => { setToken(null); localStorage.removeItem('lp_token') }

  return (
    <AuthContext.Provider value={{ isAuthed: !!token, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
