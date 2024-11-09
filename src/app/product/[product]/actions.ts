"use server"

import { db } from "@/db"

async function getProducts(product: string) {
  const oneProduct = await db.product.findFirst({
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      image: true,
      rating: true,
      quantity: true,
    },
    where: { name: { equals: product } },
  })

  return oneProduct
}

async function getOpiniones(productId: string) {
  const opiniones = await db.review.findMany({
    where: {
      productId: { equals: productId },
    },
    select: {
      id: true,
      User: { select: { name: true } },
      rating: true,
      title: true,
      comment: true,
      createdAt: true,
    },
  })

  const send = opiniones.map((opinion) => {
    return {
      id: opinion.id,
      user: opinion.User.name,
      rating: opinion.rating,
      title: opinion.title,
      comment: opinion.comment,
      createdAt: opinion.createdAt,
    }
  })

  return send
}

interface OpinionData {
  userId: string
  productId: string
  rating: number
  title: string
  comment?: string
}

async function addOpinion(data: OpinionData) {
  await db.review.create({
    data: {
      rating: data.rating,
      title: data.title,
      comment: data.comment,
      User: { connect: { id: data.userId } },
      Product: { connect: { id: data.productId } },
    },
  })

  // Calcular el nuevo promedio de calificaciones
  const reviews = await db.review.findMany({
    where: { productId: { equals: data.productId } },
    select: { rating: true },
  })

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  // Actualizar el promedio de calificaciones en la tabla Product
  await db.product.update({
    where: { id: data.productId },
    data: { rating: averageRating },
  })
}

export { getProducts, getOpiniones, addOpinion }
