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
