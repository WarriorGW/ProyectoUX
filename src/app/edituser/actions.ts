"use server"
import { db } from "@/db"
import cloudinary from "@/util/Cloudinary"

async function updateUser(id: string, data: { name: string; picture?: File }) {
  try {
    let imgURLs: string | undefined
    if (data.picture) {
      imgURLs = await uploadImage(data.picture)
    }
    console.log(id, data)
    const res = await db.user.update({
      where: { id },
      data: { name: data.name, picture: imgURLs },
    })
    console.log(res)
  } catch (error) {
    console.error("Error actualizando usuario:", error)
  }
}

async function uploadImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const response = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          public_id: `${Date.now()}`,
          folder: "padi/avatars",
          transformation: ["SquareCenter"],
        },
        (error, result) => {
          if (error) return reject(error)
          resolve(result)
        }
      )
      .end(buffer)
  })

  return (response as { secure_url: string }).secure_url // Retorna solo la URL de la imagen
}

export { updateUser }
