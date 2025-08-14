
import React, { useEffect, useMemo, useState } from 'react'
import { api } from '@api/client'
import { endpoints } from '@api/endpoints'

type SphereScore = { name: string; score: number }
type DailyReport = {
  id?: number
  date: string // YYYY-MM-DD
  description?: string
  spheres: SphereScore[]
}

const emptyDay = (): DailyReport => ({
  date: new Date().toISOString().slice(0,10),
  description: '',
  spheres: [{name:'Сон', score:7},{name:'Спорт', score:0},{name:'Хобби', score:0}]
})

export default function ReportsDaily(){
  const [items, setItems] = useState<DailyReport[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<DailyReport>(emptyDay())

  const avg = useMemo(()=> form.spheres.length ? (form.spheres.reduce((s,x)=>s+x.score,0) / form.spheres.length) : 0, [form])

  const load = async () => {
    setLoading(true); setError(null)
    try{
      const res = await api.get(endpoints.reports.daily)
      setItems(res.data || [])
    }catch(e:any){ setError(e?.response?.data?.detail || e.message) }
    finally{ setLoading(false) }
  }

  useEffect(()=>{ load() }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try{
      const res = await api.post(endpoints.reports.daily, form)
      setItems((prev)=> [res.data, ...prev])
      setForm(emptyDay())
    }catch(e:any){ setError(e?.response?.data?.detail || e.message) }
  }

  const remove = async (id?: number) => {
    if(!id) return
    try{
      await api.delete(`${endpoints.reports.daily}/${id}`)
      setItems(prev => prev.filter(x => x.id !== id))
    }catch(e:any){ setError(e?.response?.data?.detail || e.message) }
  }

  const addSphere = () => setForm(f => ({...f, spheres: [...f.spheres, {name:'', score:0}]}))
  const updateSphere = (i: number, patch: Partial<SphereScore>) => setForm(f => {
    const next = [...f.spheres]; next[i] = {...next[i], ...patch}; return {...f, spheres: next}
  })
  const removeSphere = (i: number) => setForm(f => ({...f, spheres: f.spheres.filter((_,idx)=> idx!==i)}))

  return (
    <div>
      <h2>Дневные отчёты</h2>
      <form onSubmit={submit} style={{display:'grid', gap:8, maxWidth:640}}>
        <label>Дата <input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} required/></label>
        <label>Описание <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} rows={3}/></label>
        <fieldset style={{border:'1px solid #e5e7eb', padding:8}}>
          <legend>Сферы</legend>
          {form.spheres.map((s, i)=>(
            <div key={i} style={{display:'grid', gridTemplateColumns:'1fr 110px auto', gap:8, alignItems:'center', marginBottom:6}}>
              <input placeholder="Название" value={s.name} onChange={e=>updateSphere(i,{name:e.target.value})}/>
              <input type="number" min={0} max={10} value={s.score} onChange={e=>updateSphere(i,{score: Number(e.target.value)})}/>
              <button type="button" onClick={()=>removeSphere(i)}>Удалить</button>
            </div>
          ))}
          <button type="button" onClick={addSphere}>Добавить сферу</button>
        </fieldset>
        <div>Средний балл: {avg.toFixed(2)}</div>
        <button type="submit">Сохранить день</button>
        {error && <div style={{color:'crimson'}}>{error}</div>}
      </form>

      <hr style={{margin:'16px 0'}}/>

      {loading ? 'Загрузка...' : (
        <table>
          <thead><tr><th>Дата</th><th>Средняя</th><th>Описание</th><th></th></tr></thead>
          <tbody>
            {items.map(x => (
              <tr key={x.id}>
                <td>{x.date}</td>
                <td>{(x.spheres?.reduce((s,y)=>s+y.score,0) / (x.spheres?.length||1)).toFixed(2)}</td>
                <td>{x.description}</td>
                <td><button onClick={()=>remove(x.id)}>Удалить</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
