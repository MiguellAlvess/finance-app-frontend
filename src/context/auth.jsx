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
  const signUpMutation = useSignUp()
  const loginMutation = useLogin()
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
