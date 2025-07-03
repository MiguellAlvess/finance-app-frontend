import { zodResolver } from '@hookform/resolvers/zod'
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
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const handleSubmit = (data) => {
    console.log(data)
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
