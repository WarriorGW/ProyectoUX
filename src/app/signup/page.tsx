import BodyWrapper from "@/components/BodyWrapper"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import React from "react"
// import { Form } from "@/components/ui/form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

function Login() {
  // const FormSchema = z.object({
  //   email: z.string().min(2, {
  //     message: "Username must be at least 2 characters.",
  //   }),
  //   password: z.string().min(6, {
  //     message: "Password must be at least 6 characters.",
  //   }),
  // })

  // const form = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  // })

  return (
    <BodyWrapper className='flex flex-col justify-center items-center'>
      <div className='w-[60%] bg-white rounded-lg p-5 flex'>
        <div className='w-full flex flex-col justify-center items-center'>
          <h1 className='text-2xl font-bold mb-4'>Registrarse</h1>
          <div className='w-[80%] flex flex-col gap-y-5'>
            {/* <Form {...form}>
              <form> */}
            <div>
              <Label>Correo electrónico</Label>
              <Input placeholder='example@jon.doe' />
            </div>
            <div>
              <Label>Contraseña</Label>
              <Input placeholder='********' />
            </div>
            <Button variant='yellow'>Iniciar sesión</Button>
            {/* </form>
            </Form> */}
            <div className='flex flex-row justify-end items-center'>
              <p>¿Ya tienes cuenta?</p>
              <Link
                href='/signup'
                className={buttonVariants({
                  variant: "link",
                  className: "text-sky-500",
                })}
              >
                Inicia sesión aquí
              </Link>
            </div>
          </div>
        </div>
      </div>
    </BodyWrapper>
  )
}

export default Login
