"use client"

import BodyWrapper from "@/components/BodyWrapper"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { updateUser } from "./actions"

const formSchema = z.object({
  name: z
    .string({ required_error: "El nombre es requerido" })
    .min(3, {
      message: "Debe tener al menos 10 caracteres",
    })
    .max(20, { message: "No puede tener más de 100 caracteres" }),

  // family_name: z
  //   .string()
  //   .min(3, {
  //     message: "Debe tener al menos 10 caracteres",
  //   })
  //   .max(20, { message: "No puede tener más de 100 caracteres" }),

  // picture: z.number(),
})

type FormData = {
  name: ""
  // family_name: ""
  // picture: number
}

function EditUser() {
  // const userData = useKindeBrowserClient()

  // const { data: product } = useQuery({
  //     queryKey: ["product"],
  //     queryFn: async () => {
  //       return await getOneProduct(editID as string)
  //     },
  //     gcTime: 0,
  //     enabled: !!editID,
  //   })

  const user = useKindeBrowserClient()
  const id = user.user?.id

  const { mutate } = useMutation({
    mutationFn: async (data: { name: string }) => {
      console.log(id, data)
      await updateUser(id!, data)
    },
  })

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      // family_name: "",
      // picture: 0,
    },
  })

  // const { setValue } = form

  // useEffect(() => {
  //     if () {
  //       // setImageUrls(product.image)
  //       setValue("nombre", product.name)
  //       setValue("cantidad", product.quantity)
  //       setValue("precio_base", product.price)
  //     }
  //   }, [])

  function onSubmit(values: FormData) {
    console.log(values)

    mutate(values)
    // try {
    //   setIsOpen(false)
    // } catch (error) {
    //   console.error(error)
    // }
  }

  return (
    <BodyWrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl></FormControl>
                <Input placeholder='John' {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name='family_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl></FormControl>
                <Input placeholder='Doe' {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='picture'
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl></FormControl>
                <Input type='number' {...field} />
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button type='submit' variant='gray' className='w-full'>
            Guardar datos
          </Button>
        </form>
      </Form>
    </BodyWrapper>
  )
}

export default EditUser
