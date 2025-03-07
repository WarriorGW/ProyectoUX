"use server"

import { db } from "@/db"

async function getCategories() {
  const categories = await db.category.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: { name: "asc" },
  })

  return categories
}

async function getUserById(id: string) {
  const user = await db.user.findUnique({
    where: { id },
    select: { name: true },
  })
  return user
}

export { getCategories, getUserById }
