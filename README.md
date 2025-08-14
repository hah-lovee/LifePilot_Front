
# LifePilot Frontend (MVP)

Рабочий, лаконичный фронт для LifePilot (FastAPI). Функционал важнее дизайна.

## Стек
- React + Vite + TypeScript
- React Router
- Axios (интерсептор Bearer)

## Страницы
- Login — авторизация (ожидает `POST /auth/login -> { access_token }`)
- Dashboard — баланс и PnL
- Daily Reports — отчёты по дням, кастомные сферы, удаление
- Domains — CRUD доменов/сфер
- Crypto — ввод/список транзакций
- Settings — настройка API базового URL и JWT в localStorage (для MVP)

## Ожидаемые эндпойнты (правь `src/api/endpoints.ts`, если отличаются)
- `POST /auth/login` → `{ access_token: "..." }`
- `GET /reports/daily`, `POST /reports/daily`, `DELETE /reports/daily/{id}`
- `GET /domains`, `POST /domains`, `DELETE /domains/{id}`
- `GET /crypto/okx/balance`
- `GET /crypto/pnl`
- `GET /crypto/transactions`, `POST /crypto/transactions`

## Запуск
```bash
npm i
npm run dev
```
Открой: http://localhost:5173

Создай `.env` из `.env.example` и укажи:
```
VITE_API_BASE_URL=http://localhost:8000
```

## Заметки по безопасности
- Токен хранится в localStorage (MVP). В продакшене лучше httpOnly cookies + короткий TTL + CSRF.
- Не коммить `.env`.

## Что можно добавить потом
- Импорт CSV для криптосделок
- Валидация форм (zod / react-hook-form)
- Диаграммы продуктивности по неделе/месяцу/году
- PWA / мобильная оптимизация
