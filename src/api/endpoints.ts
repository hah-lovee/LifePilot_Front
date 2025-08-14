
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  domains: '/domains',
  reports: { daily: '/reports/daily' },
  crypto: {
    balance: '/crypto/okx/balance',
    pnl: '/crypto/pnl',
    transactions: '/crypto/transactions'
  }
} as const
