"use server"

import { db } from "@/db"

function getProducts() {
  const products = db.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      rating: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return products
}

export { getProducts }
