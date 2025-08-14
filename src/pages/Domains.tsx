
import React, { useEffect, useState } from 'react'
import { api } from '@api/client'
import { endpoints } from '@api/endpoints'

type Domain = { id?: number; name: string; description?: string }

export default function Domains(){
  const [items, setItems] = useState<Domain[]>([])
  const [form, setForm] = useState<Domain>({name:'', description:''})
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true); setError(null)
    try{
      const res = await api.get(endpoints.domains)
      setItems(res.data || [])
    }catch(e:any){ setError(e?.response?.data?.detail || e.message) }
    finally{ setLoading(false) }
  }
  useEffect(()=>{ load() }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    try{
      const res = await api.post(endpoints.domains, form)
      setItems(prev=>[res.data, ...prev])
      setForm({name:'', description:''})
    }catch(e:any){ setError(e?.response?.data?.detail || e.message) }
  }
  const remove = async (id?: number) => {
    if(!id) return
    try{
      await api.delete(`${endpoints.domains}/${id}`)
      setItems(prev => prev.filter(x => x.id !== id))
    }catch(e:any){ setError(e?.response?.data?.detail || e.message) }
  }

  return (
    <div>
      <h2>Домены/Сферы</h2>
      <form onSubmit={submit} style={{display:'grid', gap:8, maxWidth:480}}>
        <input placeholder="Название" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required/>
        <textarea placeholder="Описание" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} rows={3}/>
        <button>Добавить</button>
        {error && <div style={{color:'crimson'}}>{error}</div>}
      </form>
      <hr/>
      {loading ? 'Загрузка...' : (
        <ul>
          {items.map(x => (
            <li key={x.id} style={{display:'flex', alignItems:'center', gap:8}}>
              <strong>{x.name}</strong> — {x.description}
              <button onClick={()=>remove(x.id)} style={{marginLeft:'auto'}}>Удалить</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
