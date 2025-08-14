
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '@api/client'
import { endpoints } from '@api/endpoints'
import { useAuth } from '@state/auth'

export default function Login(){
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { login: doLogin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as any)?.from?.pathname || '/'

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null); setLoading(true)
    try{
      const res = await api.post(endpoints.auth.login, { username: login, password })
      const token = res.data?.access_token || res.data?.token || ''
      if(!token) throw new Error('Токен не получен')
      doLogin(token)
      navigate(from, { replace: true })
    }catch(err:any){
      setError(err?.response?.data?.detail || err.message || 'Ошибка входа')
    }finally{ setLoading(false) }
  }

  return (
    <div style={{maxWidth:360, margin:'10vh auto'}}>
      <h2>Вход</h2>
      <form onSubmit={onSubmit} style={{display:'grid', gap:8}}>
        <label>Логин<input value={login} onChange={e=>setLogin(e.target.value)} required /></label>
        <label>Пароль<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></label>
        {error && <div style={{color:'crimson'}}>{error}</div>}
        <button disabled={loading}>{loading ? 'Входим...' : 'Войти'}</button>
      </form>
    </div>
  )
}
