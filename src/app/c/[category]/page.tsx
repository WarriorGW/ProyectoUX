"use client"

import { CarouselSize } from "@/components/Carousel"
import LoginModal from "@/components/LoginModal"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

function Category({ params }: { params: { category: string } }) {
  const [isOpen, setIsOpen] = useState(false)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const newOpacity = Math.max(1 - window.scrollY / 500, 0) // Se vuelve transparente en 500px de scroll
      setOpacity(newOpacity)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className='flex flex-col items-center justify-center h-full gap-y-20'>
      <img
        src='/woman-us.png' // Imagen aleatoria de Unsplash
        alt='Imagen de prueba'
        className='w-full h-full object-cover transition-opacity duration-300'
        style={{ opacity }}
      />
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
      Nombre de la categoria: {params.category}
      <CarouselSize />
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
    </div>
  )
}

export default Category
