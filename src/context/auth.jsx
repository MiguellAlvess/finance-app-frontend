import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useLogin, useSignUp } from '@/api/hooks/user'
import { UserService } from '@/api/services/user'
import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage'

export const AuthContext = createContext({
  user: null,
  isInitializing: true,
  login: () => {},
  signup: () => {},
  signOut: () => {},
})

export const useAuthContext = () => useContext(AuthContext)

const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, tokens.acessToken)
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken)
}

const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
}

export const AuthContextProvider = ({ children }) => {
  const [isInitializing, setIsInitializing] = useState(true)
  const [user, setUser] = useState()
  const signupMutation = useSignUp()
  const loginMutation = useLogin()
  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(false)
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        )
        if (!accessToken && refreshToken) return

        const response = await UserService.me()
        setUser(response)
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
  const login = async (data) => {
    try {
      const loggedUser = await loginMutation.mutateAsync(data)
      setTokens(loggedUser.tokens)
      setUser(loggedUser)
      toast.success('Login realizado com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao fazer login. Tente novamente mais tarde!')
    }
  }
  const signup = async (data) => {
    try {
      const createdUser = await signupMutation.mutateAsync(data)
      setUser(createdUser)
      setTokens(createdUser.tokens)
      toast.success('Conta criada com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error(
        'Erro ao criar a conta. Por favor, tente novamente mais tarde.'
      )
    }
  }
  const signOut = () => {
    setUser(null)
    removeTokens()
  }
  return (
    <AuthContext.Provider
      value={{ user, login, signup, isInitializing, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
