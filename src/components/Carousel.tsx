import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      plugins={[Autoplay({ delay: 3000 })]}
      className='w-full max-w-sm font-'
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
            <div className='p-1'>
              <Card>
                <CardContent className='flex aspect-square items-center justify-center p-6'>
                  <span className='text-3xl font-semibold'>{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
