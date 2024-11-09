import React from "react"
import { Star, StarHalf } from "lucide-react"

const RatingStars = ({
  rating = 0,
  noNumber,
}: {
  rating: number
  noNumber?: boolean
}) => {
  const totalStars = 5
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5
  const formattedRating = rating.toFixed(1)

  return (
    <span className='flex items-center font-semibold gap-x-1'>
      {noNumber ? null : formattedRating}
      <div className='flex text-yellow-400'>
        {[...Array(fullStars)].map((_, index) => (
          <Star key={index} className='size-5 stroke-[2px] fill-yellow-300' />
        ))}
        {halfStar && (
          <>
            <StarHalf
              key='half-star'
              className='size-5 stroke-[2px] fill-yellow-300'
            />
            <StarHalf className='size-5 transform -scale-x-100 -ml-5' />
          </>
        )}
        {[...Array(totalStars - fullStars - (halfStar ? 1 : 0))].map(
          (_, index) => (
            <Star key={index + fullStars + 1} className='size-5 stroke-[2px]' />
          )
        )}
      </div>
    </span>
  )
}

export default RatingStars
