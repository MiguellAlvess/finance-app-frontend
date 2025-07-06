import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
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
import { Checkbox } from '@/components/ui/checkbox'
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
import { AuthContext } from '@/context/auth'

const signupSchema = z
  .object({
    firstName: z.string().trim().min(1, {
      message: 'O nome é obrigatório',
    }),
    lastName: z.string().trim().min(1, {
      message: 'O sobrenome é obrigatório',
    }),
    email: z
      .string()
      .trim()
      .min(1, {
        message: 'O e-mail é obrigatório',
      })
      .email({
        message: 'O email é inválido',
      }),
    password: z.string().trim().min(6, {
      message: 'A senha precisa ter pelo menos 6 caracteres',
    }),
    passwordConfirmation: z.string().trim().min(6, {
      message: 'A confirmação de senha é obrigatória',
    }),
    terms: z.boolean().refine((value) => value === true, {
      message: 'Voce precisa aceitar os termos de uso',
    }),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirmation
    },
    {
      message: 'As senhas precisam ser iguais',
      path: ['passwordConfirmation'],
    }
  )

const SignupPage = () => {
  const { user, signup } = useContext(AuthContext)

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: false,
    },
  })

  const handleSubmit = (data) => {
    signup(data)
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
              <CardTitle>Crie a sua conta</CardTitle>
              <CardDescription>Insira os seus dados abaixo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Digite seu sobrenome" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder="Digite sua senha novamente"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => {
                  return (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="leading-none">
                        <label
                          htmlFor="terms"
                          className={`text-xs text-muted-foreground opacity-75 ${form.formState.errors.terms && 'text-red-500'}`}
                        >
                          Ao clicar em &quot;Criar conta&quot;, voce aceita os{' '}
                          <a
                            href="#"
                            className={`text-white underline ${form.formState.errors.terms && 'text-red-500'}`}
                          >
                            nosso termo de uso e politica de privacidade
                          </a>
                        </label>
                      </div>
                    </FormItem>
                  )
                }}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Criar conta</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Já possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to="/login">Faça login</Link>
        </Button>
      </div>
    </div>
  )
}

export default SignupPage
