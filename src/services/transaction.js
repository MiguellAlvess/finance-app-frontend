import { protectedApi } from '@/lib/axios'

export const TransactionService = {
  create: async (input) => {
    const response = await protectedApi.post('/transactions/me', input)
    return response.data
  },
}
