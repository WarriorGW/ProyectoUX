// async function updateUser(data: FormData) {
//   const response = await fetch("/api/update-profile", {
//     method: "POST", // Puede ser PATCH si la lógica lo requiere
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
"use server"
import { db } from "@/db"

//   console.log(response)
//   return response
// }

async function updateUser(id: string, data: { name: string }) {
  try {
    console.log(id, data)
    const res = await db.user.update({
      where: { id },
      data: { name: data.name },
    })
    console.log(res)
  } catch (error) {
    console.error("Error actualizando usuario:", error)
  }
}

export { updateUser }
