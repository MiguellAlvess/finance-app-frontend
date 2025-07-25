import {
  ExternalLinkIcon,
  Loader2Icon,
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react'
import { useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { toast } from 'sonner'

import { useEditTransactionForm } from '@/forms/hooks/transaction'

import { Button } from './ui/button'
import { DatePicker } from './ui/date-picker'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

const EditTransactionButton = ({ transaction }) => {
  const [shetIsOpen, setSheetIsOpen] = useState(false)
  const { form, onSubmit } = useEditTransactionForm({
    transaction,
    onSuccess: () => {
      setSheetIsOpen(false)
      toast.success('Transação editada com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao editar a transação. Tente novamente mais tarde!')
    },
  })
  return (
    <Sheet open={shetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <ExternalLinkIcon className="text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[450px]">
        <SheetTitle>Editar transação</SheetTitle>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Digite o nome da transação"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <NumericFormat
                      placeholder="Digite o valor da transação"
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$ "
                      allowNegative={false}
                      customInput={Input}
                      {...field}
                      onChange={() => {}}
                      onValueChange={(values) =>
                        field.onChange(values.floatValue)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <DatePicker
                      {...field}
                      placeholder="Selecione a data da transação"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-3 gap-4">
                      <Button
                        variant={
                          field.value === 'EARNING' ? 'secondary' : 'outline'
                        }
                        type="button"
                        onClick={() => field.onChange('EARNING')}
                      >
                        <TrendingUpIcon className="text-primary-green" />
                        Ganho
                      </Button>
                      <Button
                        variant={
                          field.value === 'EXPENSE' ? 'secondary' : 'outline'
                        }
                        type="button"
                        onClick={() => field.onChange('EXPENSE')}
                      >
                        <TrendingDownIcon className="text-primary-red" />
                        Gasto
                      </Button>
                      <Button
                        variant={
                          field.value === 'INVESTMENT' ? 'secondary' : 'outline'
                        }
                        type="button"
                        onClick={() => field.onChange('INVESTMENT')}
                      >
                        <PiggyBankIcon className="text-primary-blue" />
                        Investimento
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className="space-x-4">
              <SheetClose asChild>
                <Button
                  type="reset"
                  variant="secondary"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  Cancelar
                </Button>
              </SheetClose>
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2Icon className="animate-spin" />
                )}
                Salvar
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

export default EditTransactionButton
