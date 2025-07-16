import { ExternalLinkIcon } from 'lucide-react'

import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet'

const EditTransactionButton = ({ transaction }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <ExternalLinkIcon className="text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>Editar transação</SheetTitle>
        {transaction?.name}
      </SheetContent>
    </Sheet>
  )
}

export default EditTransactionButton
