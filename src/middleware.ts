import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { type NextRequest, NextResponse } from "next/server"

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const { getUser, getPermission } = getKindeServerSession()
    const user = await getUser()
    const hasPermission = await getPermission("manage-inventory")
    if (!user) {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
    if (!hasPermission?.isGranted) {
      return NextResponse.redirect(new URL("/not-found", request.url))
    }
  }
  return NextResponse.next()
}
