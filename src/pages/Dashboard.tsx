
import React, { useEffect, useState } from 'react'
import { api } from '@api/client'
import { endpoints } from '@api/endpoints'

type Balance = { asset: string; free: number; locked?: number }
type Pnl = { total_rub: number; realized_rub: number; unrealized_rub: number }

export default function Dashboard(){
  const [balance, setBalance] = useState<Balance[]>([])
  const [pnl, setPnl] = useState<Pnl | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      try{
        const [b, p] = await Promise.all([
          api.get(endpoints.crypto.balance),
          api.get(endpoints.crypto.pnl)
        ])
        setBalance(b.data?.balances || b.data || [])
        setPnl(p.data)
      }catch(e:any){ setErr(e?.response?.data?.detail || e.message) }
    })()
  }, [])

  return (
    <div>
      <h2>Дашборд</h2>
      {err && <div style={{color:'crimson'}}>Ошибка: {err}</div>}
      <section>
        <h3>Крипто баланс</h3>
        <table>
          <thead><tr><th>Актив</th><th>Количество</th><th>Заморожено</th></tr></thead>
          <tbody>
            {balance.map((b, i)=>(<tr key={i}><td>{b.asset}</td><td>{b.free}</td><td>{b.locked ?? 0}</td></tr>))}
          </tbody>
        </table>
      </section>
      <section>
        <h3>PNL (RUB через RUBUSDT)</h3>
        {pnl ? (
          <ul>
            <li>Всего: {pnl.total_rub}</li>
            <li>Реализовано: {pnl.realized_rub}</li>
            <li>Нереализовано: {pnl.unrealized_rub}</li>
          </ul>
        ) : <div>Нет данных</div>}
      </section>
    </div>
  )
}
