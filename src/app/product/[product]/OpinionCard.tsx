import RatingStars from "@/components/RatingStars"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { ThumbsUp, User } from "lucide-react"

interface UserOpinionProps {
  user?: string
  rating: number
  title: string
  comment?: string
  createdAt: Date
}

function UserOpinion({ opinion }: { opinion: UserOpinionProps }) {
  return (
    <div className='flex flex-col gap-y-2 my-8'>
      <div className='flex flex-row items-center gap-3'>
        <Avatar>
          <AvatarFallback>
            <User className='stroke-1' />
          </AvatarFallback>
        </Avatar>
        {opinion.user}
      </div>
      <div className='flex flex-row gap-x-2'>
        <RatingStars rating={opinion.rating} noNumber />
        <h3 className='font-semibold'>{opinion.title}</h3>
      </div>
      <p className=''>{opinion.comment}</p>
      <div className='flex flex-row gap-x-5'>
        <Button variant='gray'>
          <ThumbsUp className='size-5 opacity-60 stroke-[3px]' />
        </Button>
        {/* <Button variant='destructive' className='flex flex-row gap-x-2'>
          <CircleAlert className='size-5' /> Reportar
        </Button> */}
      </div>
    </div>
  )
}

export default UserOpinion
