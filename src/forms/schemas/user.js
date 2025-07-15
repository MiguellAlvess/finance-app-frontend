import z from 'zod'

export const loginFormSchema = z.object({
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

export const signupFormSchema = z
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
