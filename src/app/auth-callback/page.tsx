"use client"

import { useQuery } from "@tanstack/react-query"
import { getAuthStatus } from "./actions"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"

function AuthCallback() {
  const router = useRouter()

  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 5000,
  })

  useEffect(() => {
    if (data?.success) {
      router.push("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='size-8 animate-spin text-zinc-500' />
        <h3 className='font-semibold text-xl'>Iniciando sesion...</h3>
        <p>Seras redirigido automaticamente.</p>
      </div>
    </div>
  )
}

export default AuthCallback
