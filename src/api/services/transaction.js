import queryString from 'query-string'

import { protectedApi } from '@/lib/axios'

export const TransactionService = {
  create: async (input) => {
    const response = await protectedApi.post('/transactions/me', {
      amount: input.amount,
      name: input.name,
      date: input.date,
      type: input.type,
    })
    return response.data
  },
  getAll: async (input) => {
    const query = queryString.stringify({ from: input.from, to: input.to })
    const response = await protectedApi.get(`/transactions/me?${query}`)
    return response.data
  },
  update: async (input) => {
    const response = await protectedApi.patch(`/transactions/me/${input.id}`, {
      amount: input.amount,
      name: input.name,
      date: input.date,
      type: input.type,
    })
    return response.data
  },
}
