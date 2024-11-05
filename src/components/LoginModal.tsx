import type { Dispatch, SetStateAction } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components"
import Image from "next/image"
import { buttonVariants } from "./ui/button"

function LoginModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className=''>
        <DialogHeader>
          <div className='relative mx-auto size-52 mb-2'>
            <Image
              src='/logo.png'
              alt='snake image'
              className='object-contain'
              fill
              sizes='100%'
            />
          </div>
          <DialogTitle className='text-3xl text-center font-bold tracking-tight text-gray-900'>
            Inicia sesión para continuar
          </DialogTitle>
          <DialogDescription className='text-base text-center py-2'>
            Por favor inicia sesión o registrate para continuar.
          </DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-2 gap-6 divide-x divide-gray-200'>
          <LoginLink
            // href={"/login"}
            className={buttonVariants({
              variant: "yellow",
            })}
          >
            Iniciar sesion
          </LoginLink>
          <RegisterLink
            // href={"/register"}
            className={buttonVariants({
              variant: "gray",
            })}
          >
            Registrarse
          </RegisterLink>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal
