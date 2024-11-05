"use client"

import RatingStars from "@/components/RatingStars"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import products from "@/lib/UX.json"
import { ShoppingCart } from "lucide-react"
import CaracteristicasProducto from "./CaracteristicasProducto"

function ViewProduct({ params }: { params: { id: string } }) {
  function getProductById(id: number) {
    return products.find((product) => product.id === id)
  }

  const productId = parseInt(params.id, 10)
  const data = getProductById(productId)

  return (
    <div className='flex flex-col gap-y-5'>
      <div className='flex bg-white rounded-lg p-5 flex-col md:flex-row gap-5 justify-between items-center'>
        <div className='aspect-square min-h-80 rounded-md min-w-80 max-h-80 max-w-80 overflow-hidden'>
          {false ? (
            <Skeleton className='size-full' />
          ) : (
            <img
              src={data?.image}
              alt={data?.name}
              className='size-full object-cover'
            />
          )}
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
      {/* <div className='bg-white rounded-lg p-5 flex gap-5'>
        {true ? <></> : <></>}
      </div> */}
    </div>
  )
}

export default ViewProduct
