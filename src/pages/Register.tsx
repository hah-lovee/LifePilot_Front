import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '@api/client'
import { endpoints } from '@api/endpoints'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('🟢 submit triggered') // ← для отладки
    setLoading(true)
    setError(null)
    try {
      await api.post(endpoints.auth.register, { username, email, password })
      alert('Пользователь зарегистрирован. Войдите.')
      navigate('/login')
    } catch (err: any) {
      const msg = err?.response?.data?.detail || 'Ошибка регистрации'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: '10vh auto' }}>
      <h2>Регистрация</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8 }}>
        <label>
          Логин
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Пароль
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <div style={{ color: 'crimson' }}>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Регистрируем...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  )
}
