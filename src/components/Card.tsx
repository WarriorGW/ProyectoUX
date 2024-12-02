// import { cn } from "@/lib/utils"
import { cn, formatToURL } from "@/lib/utils"
import Link from "next/link"
import RatingStars from "./RatingStars"

interface ProductCardProps {
  id: string
  name: string
  price: number
  rating: number | null
  image: string[]
}

function Card({
  product,
  display,
}: {
  product: ProductCardProps
  display: number
}) {
  const imageUrl =
    product.image.length > 0
      ? product.image[0]
      : "https://placehold.co/600?font=roboto&text=No+Image"
  return (
    <div
      className={cn(
        "p-4 rounded-xl size-full flex flex-col justify-center items-center shadow-sm gap-y-3 bg-white relative",
        {
          "max-w-[300px] max-h-[350px] md:max-w-[250px] md:max-h-[330px]":
            display === 1,
          "max-w-[150px] max-h-[275px]": display === 2,
        }
      )}
    >
      <div className='bg-gray-100 aspect-square w-full rounded-md p-0 overflow-hidden'>
        <img
          src={imageUrl}
          alt='undefined'
          className='size-full object-cover'
        />
      </div>
      <div className='flex flex-col gap-y-2 w-full'>
        <div
          className={cn("flex justify-between pr-1 items-center", {
            "flex-row": display === 1,
            "flex-col justify-start items-start": display === 2,
          })}
        >
          <p className='text-xl font-medium'>${product.price}</p>
          <RatingStars rating={product.rating ?? 0} noNumber />
        </div>
        <Link
          href={`/product/${formatToURL(product.name)}`}
          className={cn(
            "text-pretty text-base w-full poly-component hover:text-sky-600 line-clamp-1 h-[3rem] text-ellipsis",
            {
              "line-clamp-1": display === 1,
              "line-clamp-2": display === 2,
            }
          )}
        >
          {product.name}
        </Link>
      </div>
    </div>
  )
}

export default Card
