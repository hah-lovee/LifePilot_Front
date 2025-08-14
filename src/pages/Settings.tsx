
import React, { useState } from 'react'

export default function Settings(){
  const [api, setApi] = useState<string>(localStorage.getItem('lp_api') || '')
  const [token, setToken] = useState<string>(localStorage.getItem('lp_token') || '')

  const save = () => {
    if(api) localStorage.setItem('lp_api', api)
    if(token) localStorage.setItem('lp_token', token)
    alert('Сохранено. Перезагрузите страницу.')
  }

  return (
    <div>
      <h2>Настройки</h2>
      <div style={{display:'grid', gap:8, maxWidth:640}}>
        <label>API Base URL <input placeholder="http://localhost:8000" value={api} onChange={e=>setApi(e.target.value)} /></label>
        <label>JWT Token <input placeholder="скопируйте токен сюда" value={token} onChange={e=>setToken(e.target.value)} /></label>
        <button onClick={save}>Сохранить</button>
      </div>
      <p style={{marginTop:12}}>Примечание: переменная окружения <code>VITE_API_BASE_URL</code> имеет приоритет над локальным значением.</p>
    </div>
  )
}
