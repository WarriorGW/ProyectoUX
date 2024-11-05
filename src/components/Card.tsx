// import { cn } from "@/lib/utils"
import Link from "next/link"
import RatingStars from "./RatingStars"

interface ProductCardProps {
  id: number
  name: string
  price: number
  rating: number | null
  image: string
}

function Card({ product }: { product: ProductCardProps }) {
  return (
    <div className='p-5 rounded-xl w-[300px] md:w-[250px] flex flex-col justify-center items-center shadow-sm gap-y-3 bg-white relative'>
      <div className='bg-gray-100 aspect-square w-full rounded-md p-0 overflow-hidden'>
        <img
          src={product.image}
          alt='undefined'
          className='size-full object-cover'
        />
      </div>
      <div className='flex flex-col gap-y-2 w-full'>
        <div className='flex flex-row justify-between pr-1 items-center'>
          <p className='text-xl font-medium'>${product.price}</p>
          <RatingStars rating={product.rating ?? 0} noNumber />
        </div>
        <Link
          href={`/product/${product.id}`}
          className='text-pretty text-lg w-full poly-component hover:text-sky-600 line-clamp-2 text-ellipsis'
        >
          {product.name}
        </Link>
      </div>
    </div>
  )
}

export default Card
