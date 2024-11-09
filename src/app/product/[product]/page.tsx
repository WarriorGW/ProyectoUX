"use client"

import RatingStars from "@/components/RatingStars"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ShoppingCart } from "lucide-react"
import CaracteristicasProducto from "./CaracteristicasProducto"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { getProducts } from "./actions"
import { revertURL } from "@/lib/utils"
import Opiniones from "./Opiniones"

function ViewProduct({ params }: { params: { [key: string]: string } }) {
  // const { user } = useKindeBrowserClient()
  const { data, isLoading } = useQuery({
    queryKey: ["product", params.product],
    queryFn: async () => await getProducts(revertURL(params.product)),
    gcTime: 0,
  })

  console.log(revertURL(params.product))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageClick = (url: string) => {
    setSelectedImage(url)
  }

  return (
    <div className='flex flex-col gap-y-5'>
      <div className='flex bg-white rounded-lg p-5 flex-col md:flex-row gap-5 justify-between items-center'>
        <div className='flex flex-col items-center w-full md:w-1/2'>
          <div className='aspect-square min-h-80 rounded-md min-w-80 max-h-80 max-w-80 overflow-hidden'>
            {isLoading ? (
              <Skeleton className='size-full' />
            ) : (
              <div className='relative'>
                <img
                  src={selectedImage || data?.image?.[0] || ""}
                  alt='Imagen principal del producto'
                  className='w-full h-auto object-cover rounded-md border'
                />
              </div>
            )}
          </div>
          <div className='flex gap-2 mt-2'>
            {data?.image?.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Imagen del producto ${index}`}
                className='w-20 h-20 object-cover cursor-pointer border rounded-md'
                onClick={() => handleImageClick(url)}
              />
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-y-5 w-full'>
          <h1 className='text-pretty text-3xl font-semibold mt-5 max-w-[90%]'>
            {data?.name}
          </h1>
          <>
            <RatingStars rating={data?.rating as number} />
          </>
          <>
            {data?.description ? (
              <p className='text-pretty max-w-[90%] min-h-5 sm:min-h-14'>
                {data.description}
              </p>
            ) : (
              <p className='h-5 sm:h-14'></p>
            )}
          </>

          <div className='flex flex-row justify-between mt-0 items-center ml-0 md:ml-3 gap-x-1 mr-10 pr-12'>
            <div></div>
            <Button size='sm' variant='yellow' className='gap-x-2'>
              <ShoppingCart size={16} /> Agregar al carrito
            </Button>
          </div>
        </div>
      </div>
      <div className='bg-white rounded-lg p-5 flex gap-5'>
        <CaracteristicasProducto />
      </div>
      <div className='bg-white rounded-lg p-5 flex gap-5'>
        {isLoading ? <></> : <Opiniones productId={data?.id} />}
      </div>
    </div>
  )
}

export default ViewProduct
