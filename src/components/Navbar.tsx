"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import {
  ChevronRight,
  ChevronsUpDown,
  LayoutDashboard,
  LogOut,
  Search,
  ShoppingCart,
  User,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button, buttonVariants } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"

function UserOptions() {
  const { user, isLoading, permissions } = useKindeBrowserClient()
  return (
    <>
      {isLoading ? (
        <Button variant='ghost'>Cargando...</Button>
      ) : user ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='bg-white/30 hover:bg-white/70 min-w-24 focus-visible:ring-offset-0 focus-visible:ring-0 gap-2'
            >
              {user.given_name} <ChevronsUpDown className='size-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link
                href={`/cart?userId=${user.id}`}
                className='flex gap-x-3 justify-center items-center'
              >
                <ShoppingCart className='size-4' />
                Carrito
              </Link>
            </DropdownMenuItem>
            {permissions.permissions.includes("manage-inventory") ? (
              <DropdownMenuItem>
                <Link
                  href='/dashboard/inventario'
                  className='flex gap-x-3 justify-center items-center'
                >
                  <LayoutDashboard className='size-4' /> Administrar
                </Link>
              </DropdownMenuItem>
            ) : (
              <></>
            )}
            <DropdownMenuSeparator className='bg-blue-100' />
            <DropdownMenuItem>
              <LogoutLink className='flex gap-x-3 justify-center items-center'>
                <LogOut className='size-4' />
                Cerrar sesión
              </LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className='flex gap-x-4 justify-center items-center'>
          <LoginLink
            postLoginRedirectURL='/auth-callback'
            className={cn(
              buttonVariants({ variant: "yellow" }),
              "gap-x-2 text-xs sm:text-base"
            )}
          >
            <User className='size-5' /> Iniciar sesión
          </LoginLink>
        </div>
      )}
    </>
  )
}

function UnderBar({ hidden }: { hidden: boolean }) {
  return (
    <div
      className={cn(
        "w-full bg-white h-10 rounded-b-3xl flex flex-row justify-center items-center py-2 transition-transform -z-50 fixed duration-200",
        { "-translate-y-full": hidden, "translate-y-0": !hidden }
      )}
    >
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Categorías</NavigationMenuTrigger>
            <NavigationMenuContent className='p-2'>
              <Link
                href={"/servicios"}
                className={buttonVariants({
                  variant: "ghost",
                  className: "gap-x-2",
                })}
              >
                Categoría 1 <ChevronRight className='size-4' />
              </Link>
              <Link
                href={"/servicios"}
                className={buttonVariants({
                  variant: "ghost",
                  className: "gap-x-2",
                })}
              >
                Categoría 2 <ChevronRight className='size-4' />
              </Link>
              <Link
                href={"/servicios"}
                className={buttonVariants({
                  variant: "ghost",
                  className: "gap-x-2",
                })}
              >
                Categoría 3 <ChevronRight className='size-4' />
              </Link>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Separator orientation='vertical' className='bg-blue-400' />
      <Link href={"/acercade"} className={buttonVariants({ variant: "ghost" })}>
        Sobre nosotros
      </Link>
      {/* <Separator orientation='vertical' className='bg-blue-400' />
      <Link
        href={"/contactanos"}
        className={buttonVariants({ variant: "ghost" })}
      >
        Contáctanos
      </Link> */}
    </div>
  )
}

function Navbar() {
  const [hideUnderBar, setHideUnderBar] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setHideUnderBar(scrollY > 30)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav className='fixed w-full z-50 top-0'>
      <div className='bg-blue-500 py-3 px-3 md:px-10 justify-between flex items-center'>
        <div className='flex-1'>
          <Link
            href='/'
            className={cn(
              buttonVariants({ variant: "semighost" }),
              "flex items-center gap-x-2 w-fit px-1"
            )}
          >
            <img src='/logo.png' alt='logo' className='size-8' />
            <p className='font-bold text-xl text-gray-800'>Diseño UX</p>
          </Link>
        </div>
        <div className='flex-1 md:flex hidden'>
          <Input className='rounded-r-none bg-white' placeholder='Buscar...' />
          <Button variant='outline' className='rounded-l-none'>
            <Search className='size-4' />
          </Button>
        </div>
        <div className='flex-1 flex justify-end'>
          <UserOptions />
        </div>
      </div>
      <UnderBar hidden={hideUnderBar} />
    </nav>
  )
}

export default Navbar
