"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { SetStateAction, useEffect } from "react"
import { addOpinion } from "./actions"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"

type FormData = {
  rating: number
  title: string
  comment?: string
}

const formSchema = z.object({
  title: z
    .string({ required_error: "El titulo es requerido" })
    .min(10, {
      message: "Debe tener al menos 10 caracteres",
    })
    .max(100, { message: "No puede tener más de 100 caracteres" }),
  comment: z
    .string()
    .min(10, {
      message: "Debe tener al menos 10 caracteres",
    })
    .max(200, {
      message: "No puede tener más de 200 caracteres",
    }),
  rating: z.preprocess(
    (val) => Number(val),
    z
      .number({ required_error: "Se requiere que de una calificación" })
      .min(0.1, { message: "La calificación mínima es 0.1" })
      .max(5, { message: "La calificación máxima es 5" })
  ),
})

function OpinionForm({
  productId,
  setIsOpen,
}: {
  productId: string
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
}) {
  const { user } = useKindeBrowserClient()
  const queryClient = useQueryClient()

  const { isPending, mutate, isSuccess, isError, error } = useMutation({
    mutationFn: async (data: FormData) => {
      await addOpinion({
        ...data,
        productId: productId,
        userId: user?.id as string,
      })
    },
    onSuccess: () => {
      // Invalida y actualiza la query específica
      queryClient.invalidateQueries({ queryKey: ["opiniones"] })
    },
  })

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      comment: "",
      rating: 0,
    },
  })

  function onSubmit(values: FormData) {
    console.log(values)

    mutate(values)
    try {
      setIsOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isPending) {
      console.log("Cargando...")
    } else if (isSuccess) {
      form.reset()
      console.log("Opinion creada")
      // window.location.reload()
    } else if (isError) {
      console.error(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, isSuccess])

  return (
    <div className='flex flex-col md:flex-row gap-x-5 items-center justify-center'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-2 md:space-y-5 lg:space-y-8 w-[95%]'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titulo</FormLabel>
                <FormControl>
                  <Input placeholder='Excelente producto' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='comment'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comentario</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Me llegó en perfectas condiciones'
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='rating'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Calificacion</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' variant='gray' className='w-full'>
            Crear post
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default OpinionForm
