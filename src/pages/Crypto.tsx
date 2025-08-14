
import React, { useEffect, useState } from 'react'
import { api } from '@api/client'
import { endpoints } from '@api/endpoints'

type Tx = { id?: number; date: string; asset: string; side: 'BUY'|'SELL'|'DEPOSIT'|'WITHDRAW'; qty: number; price_usdt?: number; fee?: number; note?: string }

export default function Crypto(){
  const [txs, setTxs] = useState<Tx[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState<Tx>({date: new Date().toISOString().slice(0,10), asset:'USDT', side:'BUY', qty:0, price_usdt:0, fee:0, note:''})

  const load = async () => {
    setLoading(true); setError(null)
    try{
      const res = await api.get(endpoints.crypto.transactions)
      setTxs(res.data || [])
    }catch(e:any){ setError(e?.response?.data?.detail || e.message) }
    finally{ setLoading(false) }
  }
  useEffect(()=>{ load() }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    try{
      const res = await api.post(endpoints.crypto.transactions, form)
      setTxs(prev=>[res.data, ...prev])
    }catch(e:any){ setError(e?.response?.data?.detail || e.message) }
  }

  return (
    <div>
      <h2>Крипто учёт</h2>
      <form onSubmit={submit} style={{display:'grid', gap:8, maxWidth:720}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap:8}}>
          <input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})}/>
          <input placeholder="Актив (BTC)" value={form.asset} onChange={e=>setForm({...form, asset:e.target.value.toUpperCase()})}/>
          <select value={form.side} onChange={e=>setForm({...form, side: e.target.value as Tx['side']})}>
            <option value="BUY">BUY</option>
            <option value="SELL">SELL</option>
            <option value="DEPOSIT">DEPOSIT</option>
            <option value="WITHDRAW">WITHDRAW</option>
          </select>
          <input type="number" step="0.00000001" placeholder="Кол-во" value={form.qty} onChange={e=>setForm({...form, qty:Number(e.target.value)})}/>
          <input type="number" step="0.00000001" placeholder="Цена USDT" value={form.price_usdt || 0} onChange={e=>setForm({...form, price_usdt:Number(e.target.value)})}/>
          <input type="number" step="0.00000001" placeholder="Комиссия" value={form.fee || 0} onChange={e=>setForm({...form, fee:Number(e.target.value)})}/>
        </div>
        <textarea placeholder="Заметка" value={form.note} onChange={e=>setForm({...form, note:e.target.value})} rows={2}/>
        <button>Добавить транзакцию</button>
        {error && <div style={{color:'crimson'}}>{error}</div>}
      </form>

      <hr/>
      {loading ? 'Загрузка...' : (
        <table>
          <thead>
            <tr><th>Дата</th><th>Актив</th><th>Сторона</th><th>Кол-во</th><th>Цена USDT</th><th>Комиссия</th><th>Заметка</th></tr>
          </thead>
          <tbody>
            {txs.map((t, i)=> (
              <tr key={t.id ?? i}>
                <td>{t.date}</td>
                <td>{t.asset}</td>
                <td>{t.side}</td>
                <td>{t.qty}</td>
                <td>{t.price_usdt ?? '-'}</td>
                <td>{t.fee ?? 0}</td>
                <td>{t.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
