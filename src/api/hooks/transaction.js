import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useAuthContext } from '@/context/auth'

import { TransactionService } from '../services/transaction'
import { getUserBalanceQueryKey } from './user'

export const createTransactionMutationKey = () => {
  return ['createTransaction']
}

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()
  const { user } = useAuthContext()
  return useMutation({
    mutationKey: createTransactionMutationKey,
    mutationFn: (input) => TransactionService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey({ userId: user.id }),
      })
      queryClient.invalidateQueries({
        queryKey: getAllTransactionsQueryKey({ userId: user.id }),
      })
    },
  })
}

export const getAllTransactionsQueryKey = ({ from, to, userId }) => {
  if (!from || !to) {
    return ['transactions', userId]
  }
  return ['transactions', userId, from, to]
}

export const useGetAllTransactions = ({ from, to }) => {
  const { user } = useAuthContext()
  return useQuery({
    queryKey: getAllTransactionsQueryKey({ userId: user.id, from, to }),
    queryFn: () => TransactionService.getAll({ from, to }),
    enabled: Boolean(from) && Boolean(to) && Boolean(user.id),
  })
}
