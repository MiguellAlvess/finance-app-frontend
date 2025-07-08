import { useMutation } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import {
  LOCAL_ACCESS_TOKEN_KEY,
  LOCAL_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage'
import { protectedApi, publicApi } from '@/lib/axios'

export const AuthContext = createContext({
  user: null,
  isInitializing: true,
  login: () => {},
  signup: () => {},
  signOut: () => {},
})

export const useAuthContext = () => useContext(AuthContext)

const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_ACCESS_TOKEN_KEY, tokens.acessToken)
  localStorage.setItem(LOCAL_REFRESH_TOKEN_KEY, tokens.refreshToken)
}

const removeTokens = () => {
  localStorage.removeItem(LOCAL_ACCESS_TOKEN_KEY)
  localStorage.removeItem(LOCAL_REFRESH_TOKEN_KEY)
}

export const AuthContextProvider = ({ children }) => {
  const [isInitializing, setIsInitializing] = useState(true)
  const [user, setUser] = useState()
  const signUpMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await publicApi.post('/users', {
        first_name: variables.firstName,
        last_name: variables.lastName,
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })
  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => {
      const response = await publicApi.post('/users/auth/login', {
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })
  const login = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (loggedUser) => {
        setTokens(loggedUser.tokens)
        setUser(loggedUser)
        toast.success('Login realizado com sucesso!')
      },
      onError: (error) => {
        console.error('Erro ao fazer login', error)
        toast.error('Erro ao fazer login. Tente novamente mais tarde!')
      },
    })
  }
  const signOut = () => {
    setUser(null)
    removeTokens()
  }
  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(false)
        const accessToken = localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)
        const refreshToken = localStorage.getItem(LOCAL_REFRESH_TOKEN_KEY)
        if (!accessToken && refreshToken) return

        const response = await protectedApi.get('/users/me')
        setUser(response.data)
      } catch (error) {
        setUser(null)
        removeTokens()
        console.error(error)
      } finally {
        setIsInitializing(false)
      }
    }

    init()
  }, [])
  const signup = (data) => {
    signUpMutation.mutate(data, {
      onSuccess: (createdUser) => {
        setUser(createdUser)
        setTokens(createdUser.tokens)
        toast.success('Conta criada com sucesso!')
      },
      onError: (error) => {
        console.error('Erro ao criar conta', error)
        toast.error('Erro ao criar conta. Tente novamente mais tarde!')
      },
    })
  }
  return (
    <AuthContext.Provider
      value={{ user, login, signup, isInitializing, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
