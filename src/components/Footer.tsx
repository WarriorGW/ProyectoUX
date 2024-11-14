import { cn } from "@/lib/utils"
import Link from "next/link"
import React from "react"
import { buttonVariants } from "./ui/button"

function Footer() {
  return (
    <footer className='bg-primary text-white'>
      <div className='max-w-screen-xl mx-auto p-4 md:py-8'>
        <div className='relative top-3 w-fit'>
          <Link href='/'>
            <img src='logo.png' className='h-8' alt='Logo' />
          </Link>
        </div>
        <div className='flex justify-center items-center mb-4 sm:mb-0'>
          <span className='block text-sm sm:text-center text-white/90 md:font-bold'>
            &copy; 2024 Derechos reservados.
          </span>
        </div>
        <hr className='my-6 border-gray-200 sm:mx-auto lg:my-8' />
        <ul className='flex flex-wrap justify-center gap-x-4 items-center mb-6 text-sm font-medium sm:mb-0'>
          <li>
            <Link
              href='/acercade'
              className={cn(buttonVariants({ variant: "link" }), "text-white")}
            >
              Sobre nosotros
            </Link>
          </li>
          <li>
            <Link
              href='/acercade'
              className={cn(buttonVariants({ variant: "link" }), "text-white")}
            >
              Politica de Privacidad
            </Link>
          </li>
          <li>
            <Link
              href='/contactanos'
              className={cn(buttonVariants({ variant: "link" }), "text-white")}
            >
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
