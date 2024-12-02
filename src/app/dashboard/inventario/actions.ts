"use server"

import { db } from "@/db"
import { Inventory } from "@/types/Inventory"
import cloudinary from "@/util/Cloudinary"

async function getProducts(): Promise<Inventory[]> {
  const inventory = await db.product.findMany({
    select: {
      id: true,
      name: true,
      quantity: true,
      price: true,
    },
  })

  return inventory
}

async function getCategories() {
  const categories = await db.category.findMany({
    select: {
      id: true,
      name: true,
    },
  })

  return categories
}

async function getOneProduct(id: string) {
  const product = await db.product.findUnique({
    where: { id },
    select: {
      id: true,
      image: true,
      name: true,
      description: true,
      price: true,
      quantity: true,
    },
  })

  return product
}

interface updateDataTypes {
  name: string
  description: string
  quantity: number
  price: number
  image?: string[]
}

async function updateProduct(id: string, formData: globalThis.FormData) {
  console.log(id)
  const imageFile = formData.get("imagen") as File | null
  const updateData: updateDataTypes = {
    name: String(formData.get("nombre")),
    description: String(formData.get("descripcion")),
    quantity: Number(formData.get("cantidad")),
    price: Number(formData.get("precio_base")),
  }
  if (imageFile) {
    console.log("con imagen")
    const response = await uploadImage([imageFile])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateData.image = (response as any).secure_url
  } else {
    console.log("sin imagen")
  }
  await db.product.update({
    where: { id },
    data: updateData,
  })
}

async function deleteProduct(id: string) {
  await db.$transaction(async (tsx) => {
    await tsx.review.deleteMany({
      where: { productId: id },
    })
    await tsx.product.delete({
      where: { id },
    })
  })
}

async function uploadImage(files: File[]) {
  const imageUrls: string[] = []

  // Subir las imágenes a Cloudinary
  for (const file of files) {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: `${Date.now()}`,
            folder: "padi",
            transformation: ["SquareCenter"],
          },
          (error, result) => {
            if (error) return reject(error)
            resolve(result)
          }
        )
        .end(buffer)
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    imageUrls.push((response as any).secure_url)
  }
  return imageUrls
}

async function addProduct(formData: globalThis.FormData) {
  const files = formData.getAll("imagenes") as File[]
  if (!files || files.length === 0) {
    console.error("No images")
    return
  }

  const imageUrls = await uploadImage(files)

  const { nombre, precio_base, cantidad } = Object.fromEntries(formData) as {
    nombre: string
    precio_base: string
    cantidad: string
  }

  // Crear el producto con la categoría seleccionada o recién creada
  const product = await db.product.create({
    data: {
      name: nombre,
      image: imageUrls,
      quantity: Number(cantidad),
      price: Number(precio_base),
    },
  })

  return product
}

export {
  addProduct,
  deleteProduct,
  getCategories,
  getOneProduct,
  getProducts,
  updateProduct,
}
