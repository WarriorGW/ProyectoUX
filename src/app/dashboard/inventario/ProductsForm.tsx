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
import {
  addProduct,
  getCategories,
  getOneProduct,
  updateProduct,
} from "./actions"

type FormData = {
  imagenes: File[]
  nombre: string
  cantidad: number
  precio_base: number
  categoria: string
}

function ProductsForm({
  editID,
  setIsOpen,
}: {
  editID?: string
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const formSchema = z.object({
    imagenes: z.array(z.instanceof(File)).nonempty({
      message: "Debe subir al menos una imagen",
    }),
    nombre: z
      .string({ required_error: "El nombre del producto es requerido" })
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
        .min(1, { message: "Debe de tener mínimo un artículo en inventario" })
        .max(100000, {
          message: "No puedes tener más de 100,000 artículos en inventario",
        })
    ),
    precio_base: z.preprocess(
      (val) => Number(val),
      z
        .number({ invalid_type_error: "Ingrese un valor" })
        .min(5, { message: "El precio base debe ser mayor a $5" })
    ),
    categoria: z.string().optional(), // Campo opcional para la categoría
    nueva_categoria: z
      .string()
      .min(1, {
        message: "El nombre de la nueva categoría es requerido",
      })
      .optional(), // Campo opcional para la nueva categoría
  })

  const [isDragOver, setIsDragOver] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const { data: product } = useQuery({
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

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await getCategories()
      return response
    },
  })

  const {
    isPending,
    mutate: mutateProduct,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data: globalThis.FormData) => {
      await addProduct(data)
    },
  })

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imagenes: [],
      nombre: "",
      cantidad: 0,
      precio_base: 0,
    },
  })

  const { setValue } = form

  useEffect(() => {
    if (product) {
      setImageUrls(product.image)
      setValue("nombre", product.name)
      setValue("cantidad", product.quantity)
      setValue("precio_base", product.price)
    }
  }, [product, setValue])

  const onSubmit = async (values: FormData) => {
    const formData = new FormData()
    values.imagenes.forEach((file) => {
      formData.append("imagenes", file)
    })
    formData.append("nombre", values.nombre)
    formData.append("cantidad", values.cantidad.toString())
    formData.append("precio_base", values.precio_base.toString())
    formData.append("categoria", values.categoria)
    if (editID) {
      update.mutate(formData)
    } else {
      mutateProduct(formData)
    }
    try {
      setIsOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isPending) {
      console.log("Cargando...")
    } else if (isSuccess) {
      form.reset()
      setImageUrls([])
      console.log("Producto creado")
    } else if (isError) {
      console.error(error)
    }
  }, [isPending, isSuccess, isError, error, form])

  useEffect(() => {
    return () => {
      // Limpia las URLs cuando el componente se desmonte
      imageUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [imageUrls])

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
    <div className='flex flex-col md:flex-row gap-x-5 items-center justify-center'>
      <div className='flex flex-1 flex-col w-[50%] md:w-[50%] gap-3'>
        <div
          className={cn(
            "relative max-w-sm aspect-square rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center my-3 md:my-0 ",
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
                className='size-full flex-1 flex flex-col items-center justify-center cursor-pointer'
                {...getRootProps()}
              >
                <Input {...getInputProps()} />
                {isDragOver ? (
                  <MousePointerSquareDashed />
                ) : isPending ? (
                  <Loader2 className='animate-spin size-6 mb-2' />
                ) : imageUrls.length > 0 ? null : (
                  <ImagePlus className='size-6 mb-2' />
                )}

                {imageUrls.length === 0 && (
                  <div className='flex flex-col justify-center mb-2 text-sm'>
                    {isPending ? (
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
            <div className='absolute inset-0 p-4 flex flex-wrap gap-4 overflow-auto'>
              <img
                src={imageUrls[0]}
                alt='Imagen de complemento'
                className={`object-cover rounded size-full`}
              />
            </div>
          )}
        </div>
        <div className=' flex gap-x-2'>
          {imageUrls.length > 0 &&
            imageUrls.slice(1).map((image, i) => (
              <div
                key={i}
                className='aspect-square w-fit rounded-xl bg-gray-900/5 p-2 overflow-hidden'
              >
                <img
                  src={image}
                  alt='Imagen de complemento'
                  className='size-14 rounded'
                />
              </div>
            ))}
        </div>
      </div>
      <div className='flex flex-col flex-1 p-2 md:p-5 space-y-5'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
            <FormField
              control={form.control}
              name='nombre'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder='Nombre del producto' {...field} />
                  </FormControl>
                  <FormDescription>Nombre del producto</FormDescription>
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
                    <Input type='number' placeholder='Cantidad' {...field} />
                  </FormControl>
                  <FormDescription>Cantidad en inventario</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='precio_base'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio Base</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='Precio base' {...field} />
                  </FormControl>
                  <FormDescription>Precio base del producto</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='categoria'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className='input'
                      onChange={(e) => {
                        const selectedCategory = e.target.value
                        form.setValue("categoria", selectedCategory)
                      }}
                    >
                      <option value='' disabled>
                        Selecciona una categoría
                      </option>
                      {categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormDescription>
                    Selecciona una categoría para el producto
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Crear Producto</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ProductsForm
