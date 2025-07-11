import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { forwardRef, useState } from 'react'

import { Button } from './ui/button'
import { Input } from './ui/input'

const PasswordInput = forwardRef(
  ({ placeholder = 'Digite sua senha', ...props }, ref) => {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false)
    return (
      <div>
        <div className="relative">
          <Input
            type={passwordIsVisible ? 'text' : 'password'}
            placeholder={placeholder}
            ref={ref}
            {...props}
          />
          <Button
            variant="ghost"
            onClick={() => setPasswordIsVisible((prevValue) => !prevValue)}
            className="absolute bottom-0 right-0 top-0 my-auto mr-1 h-8 w-8 text-muted-foreground"
            type="button"
          >
            {passwordIsVisible ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
        </div>
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
