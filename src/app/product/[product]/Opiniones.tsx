import { Button, buttonVariants } from "@/components/ui/button"
import UserOpinion from "./OpinionCard"
import { useQuery } from "@tanstack/react-query"
import { getOpiniones } from "./actions"
import DrawerDialog from "@/components/DrawerDialog"
import OpinionForm from "./OpinionForm"
import { cn } from "@/lib/utils"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useState } from "react"
import LoginModal from "@/components/LoginModal"

function Opiniones({ productId }: { productId?: string }) {
  const [isAddOpinionOpen, setIsAddOpinionOpen] = useState(false)
  const { user } = useKindeBrowserClient()

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ["opiniones"],
    queryFn: async () => {
      if (productId) {
        return await getOpiniones(productId)
      } else {
        return []
      }
    },
    gcTime: 0,
  })

  return (
    <div className='flex flex-col w-full items-center gap-y-4'>
      <h2 className='mt-5 text-2xl font-semibold'>Opiniones de los usuarios</h2>
      <div className='w-[80%]'>
        {isLoading ? (
          <p className='text-center'>Cargando opiniones...</p>
        ) : data?.length && data.length > 0 ? (
          data.map((opinion) => (
            <UserOpinion
              key={opinion.id}
              opinion={{
                ...opinion,
                user: opinion.user ?? undefined,
                comment: opinion.comment ?? undefined,
              }}
            />
          ))
        ) : (
          <p className='text-center'>No hay opiniones</p>
        )}
      </div>
      {user?.id ? (
        <DrawerDialog
          btnText='Escribir una opinión'
          title='Escribir opinión'
          description=''
          btnClass={cn(
            buttonVariants({ variant: "yellow" }),
            "w-[60%] flex flex-row gap-x-2"
          )}
          isOpen={isAddOpinionOpen}
          setIsOpen={setIsAddOpinionOpen}
        >
          <OpinionForm
            productId={productId as string}
            setIsOpen={setIsAddOpinionOpen}
          />
        </DrawerDialog>
      ) : (
        <Button
          variant='yellow'
          onClick={() => setIsLoginModalOpen(!isLoginModalOpen)}
        >
          Necesitas iniciar sesion para comentar
        </Button>
      )}
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
    </div>
  )
}

export default Opiniones
