"use server"
import { NextResponse } from "next/server"

export async function PATCH(req: Request) {
  const body = await req.json()
  const userId = "kp_bbd114ff06c74d0e87dbc5d9e78e9518" // ← Aquí necesitas el ID del usuario de Kinde

  try {
    const res = await fetch(`https://padi.kinde.com/api/v1/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.KINDE_API_TOKEN}`,
      },
      body: JSON.stringify({
        given_name: body.given_name,
        family_name: body.family_name,
        picture: body.picture,
      }),
    })

    if (!res.ok) {
      const error = await res.json()
      return NextResponse.json({ error }, { status: res.status })
    }

    const result = await res.json()
    return NextResponse.json({ result })
  } catch (error) {
    return NextResponse.json(
      { error: `Error interno: ${error}` },
      { status: 500 }
    )
  }
}
