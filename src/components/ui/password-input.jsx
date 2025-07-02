import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from './button'
import { Input } from './input'

const PasswordInput = ({ placeholder = 'Digite sua senha' }) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)
  return (
    <div>
      <div className="relative">
        <Input
          type={passwordIsVisible ? 'text' : 'password'}
          placeholder={placeholder}
        />
        <Button
          variant="ghost"
          onClick={() => setPasswordIsVisible((prevValue) => !prevValue)}
          className="absolute bottom-0 right-0 top-0 my-auto mr-1 h-8 w-8 text-muted-foreground"
        >
          {passwordIsVisible ? <EyeOffIcon /> : <EyeIcon />}
        </Button>
      </div>
    </div>
  )
}

export default PasswordInput
