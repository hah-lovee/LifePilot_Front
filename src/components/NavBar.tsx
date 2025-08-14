import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@state/auth'

const linkStyle: React.CSSProperties = {
  display: 'block',
  padding: '10px 12px',
  textDecoration: 'none',
  borderRadius: 8,
}

const active: React.CSSProperties = {
  background: '#e5e7eb',
}

export function NavBar() {
  const { isAuthed, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <aside style={{ width: 230, borderRight: '1px solid #e5e7eb', padding: 12 }}>
      <h1 style={{ fontSize: 20, marginBottom: 8 }}>LifePilot</h1>
      {isAuthed ? (
        <nav style={{ display: 'grid', gap: 6 }}>
          <NavLink to="/" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? active : {}) })}>Дашборд</NavLink>
          <NavLink to="/reports/daily" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? active : {}) })}>Дневные отчёты</NavLink>
          <NavLink to="/domains" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? active : {}) })}>Домены/Сферы</NavLink>
          <NavLink to="/crypto" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? active : {}) })}>Крипто</NavLink>
          <NavLink to="/settings" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? active : {}) })}>Настройки</NavLink>
          <button onClick={() => { logout(); navigate('/login') }} style={{ marginTop: 12 }}>Выйти</button>
        </nav>
      ) : (
        <nav style={{ display: 'grid', gap: 6 }}>
          <NavLink to="/login" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? active : {}) })}>Войти</NavLink>
          <NavLink to="/register" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? active : {}) })}>Регистрация</NavLink>
        </nav>
      )}
    </aside>
  )
}
