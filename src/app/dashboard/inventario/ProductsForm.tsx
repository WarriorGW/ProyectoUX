import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ImagePlus, Loader2, MousePointerSquareDashed } from "lucide-react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Dropzone, { FileRejection } from "react-dropzone"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { addProduct, getOneProduct, updateProduct } from "./actions"
import { Textarea } from "@/components/ui/textarea"

type FormData = {
  imagenes: File[]
  nombre: string
  descripcion: string
  cantidad: number
  precio_base: number
  categoria?: string
  nueva_categoria?: string
}

function ProductsForm({
  editID,
  setIsOpen,
}: {
  editID?: string
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const formSchema = z.object({
    imagen: editID
      ? z
          .union([
            z.instanceof(File).refine((file) => file.size <= 5000000, {
              message: "La imagen editada no puede pesar más de 5MB",
            }),
            z.literal(null),
          ])
          .optional()
      : z
          .instanceof(File)
          .refine((file) => file instanceof File, {
            message: "Debe subir una imagen",
          })
          .refine((file) => file instanceof File && file.size <= 5000000, {
            message: "La imagen creada no puede pesar más de 5MB",
          }),
    nombre: z
      .string({ required_error: "El nombre del producto es requerido" })
      .min(10, {
        message: "Debe tener al menos 10 caracteres",
      })
      .max(200, {
        message: "No puede tener más de 200 caracteres",
      }),
    descripcion: z
      .string()
      .min(10, {
        message: "Debe tener al menos 10 caracteres",
      })
      .max(200, {
        message: "No puede tener más de 200 caracteres",
      }),
    cantidad: z.preprocess(
      (val) => Number(val),
      z
        .number({
          invalid_type_error: "Ingrese un valor",
          required_error: "Ingrese un valor",
        })
        .min(1, { message: "Debe de tener minimo un articulo en inventario" })
        .max(100000, {
          message: "No puedes tener más de 100,000 articulos en inventario",
        })
    ),
    precio_base: z.preprocess(
      (val) => Number(val),
      z
        .number({ invalid_type_error: "Ingrese un valor" })
        .min(5, { message: "El precio base debe ser mayor a $5" })
    ),
  })

  const { data } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      return await getOneProduct(editID as string)
    },
    gcTime: 0,
    enabled: !!editID,
  })

  const update = useMutation({
    mutationFn: async (data: globalThis.FormData) => {
      await updateProduct(editID as string, data)
    },
  })

  const add = useMutation({
    mutationFn: async (data: globalThis.FormData) => {
      await addProduct(data)
    },
  })

  const [isDragOver, setIsDragOver] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imagenes: [],
      nombre: "",
      descripcion: "",
      cantidad: 0,
      precio_base: 0,
    },
  })

  const { setValue } = form

  useEffect(() => {
    if (data) {
      setImageUrls(data.image)
      setValue("nombre", data.name)
      setValue("descripcion", data.description ?? "")
      setValue("cantidad", data.quantity)
      setValue("precio_base", data.price)
    }
  }, [data, setValue])

  async function onSubmit(values: FormData) {
    console.log("enviando")
    console.log(values)

    const formData = new FormData()
    values.imagenes.forEach((file) => {
      formData.append("imagenes", file)
    })
    formData.append("nombre", values.nombre)
    formData.append("descripcion", values.descripcion)
    formData.append("cantidad", values.cantidad.toString())
    formData.append("precio_base", values.precio_base.toString())

    if (editID) {
      update.mutate(formData)
    } else {
      add.mutate(formData)
    }
    try {
      setIsOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  const onDropAccepted = (files: File[]) => {
    setImageUrls((prevUrls) => [
      ...prevUrls,
      ...files.map((file) => URL.createObjectURL(file)),
    ])
    form.setValue("imagenes", [...form.getValues("imagenes"), ...files])
    setIsDragOver(false)
  }

  const onDropRejected = (files: FileRejection[]) => {
    const [file] = files
    setIsDragOver(false)
    console.error(file)
  }

  return (
    <div className='flex flex-col md:flex-row gap-x-10 items-center justify-center'>
      <div
        className={cn(
          "relative max-w-sm aspect-square flex-1 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center my-3 md:my-0 w-[50%] md:w-[50%]",
          {
            "ring-blue-900/25 bg-blue-900/10": isDragOver,
          }
        )}
      >
        <Dropzone
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
          accept={{
            "image/png": [".png"],
            "image/jpg": [".jpg"],
            "image/jpeg": [".jpeg"],
          }}
          multiple
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className='flex-1 flex flex-col items-center justify-center cursor-pointer h-full w-full'
              {...getRootProps()}
            >
              <Input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed />
              ) : add.isPending ? (
                <Loader2 className='animate-spin size-6 mb-2' />
              ) : imageUrls.length > 0 ? null : (
                <ImagePlus className='size-6 mb-2' />
              )}
              {imageUrls.length === 0 && (
                <div className='flex flex-col justify-center mb-2 text-sm'>
                  {add.isPending ? (
                    <div className='flex flex-col items-center'>
                      <p>Redireccionando, por favor espere...</p>
                    </div>
                  ) : isDragOver ? (
                    <p>
                      <span className='font-semibold'>Suelta el archivo</span>
                      para subirlo
                    </p>
                  ) : (
                    <p className='text-center flex flex-col'>
                      <span className='font-semibold'>
                        Presiona para seleccionar imágenes
                      </span>
                      <span>-o-</span>
                      <span>arrastra y suelta imágenes aquí</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </Dropzone>
        {imageUrls.length > 0 && (
          <div className='absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl'>
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                className={`object-cover rounded ${
                  imageUrls.length === 1 ? "h-full w-full" : "h-32 w-1/2"
                }`}
                alt='jiji'
              />
            ))}
          </div>
        )}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-2 md:space-y-5 lg:space-y-8'
        >
          <FormField
            control={form.control}
            name='nombre'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del producto</FormLabel>
                <FormControl>
                  <Input placeholder='Tornillos de gran agarre' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='descripcion'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripcion</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Tiene una gran resistencia a la...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='cantidad'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='100'
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormDescription>
                  Cantidad de este producto en inventario
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='precio_base'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio base</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='259.00'
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' variant='gray' className='w-full'>
            Crear producto
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ProductsForm
