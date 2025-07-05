import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import PasswordInput from '@/components/ui/password-input'
import { api } from '@/lib/axios'

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, {
      message: 'O e-mail é obrigatório',
    })
    .email({
      message: 'O email é inválido',
    }),
  password: z.string().trim().min(6, {
    message: 'A senha precisa ter pelo menos 6 caracteres',
  }),
})

const LoginPage = () => {
  const [user, setUser] = useState(null)
  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => {
      const response = await api.post('/users/auth/login', {
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        if (!accessToken && refreshToken) return
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setUser(response.data)
      } catch (error) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        console.error(error)
      }
    }

    init()
  }, [])
  const handleSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (loggedUser) => {
        const accessToken = loggedUser.tokens.acessToken
        const refreshToken = loggedUser.tokens.refreshToken
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        setUser(loggedUser)
        toast.success('Login realizado com sucesso!')
      },
      onError: (error) => {
        console.error('Erro ao fazer login', error)
        toast.error('Erro ao fazer login. Tente novamente mais tarde!')
      },
    })
  }
  if (user) {
    return <h1>Olá, {user.first_name}</h1>
  }
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="w-[500px]">
            <CardHeader className="items-center justify-center">
              <CardTitle>Entre na sua conta</CardTitle>
              <CardDescription>Insira os seus dados abaixo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Digite seu e-mail" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Entrar</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">
          Ainda não possui possui uma conta?
        </p>
        <Button variant="link" asChild className="text-foredground">
          <Link to="/signup">Crie agora</Link>
        </Button>
      </div>
    </div>
  )
}

export default LoginPage
