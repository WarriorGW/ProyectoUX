"use client"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "./ui/button"
import Link from "next/link"
import { Input } from "./ui/input"
import {
  // ChevronRight,
  ChevronsUpDown,
  LayoutDashboard,
  LogOut,
  Search,
  // ShoppingCart,
  User,
} from "lucide-react"
import {
  LoginLink,
  LogoutLink,
  // RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"

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
            {/* <DropdownMenuItem>
              <Link
                href={`/carrito?userId=${user.id}`}
                className='flex gap-x-3 justify-center items-center'
              >
                <ShoppingCart className='size-4' />
                Carrito
              </Link>
            </DropdownMenuItem> */}
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
            <DropdownMenuSeparator />
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
          {/* <RegisterLink
            postLoginRedirectURL='/auth-callback'
            className={buttonVariants({
              variant: "secondary",
              className: "font-semibold text-foreground text-xs sm:text-base",
            })}
          >
            Registrarse <ChevronRight className='size-5 ml-1' />
          </RegisterLink> */}
        </div>
      )}
    </>
  )
}

function Navbar() {
  return (
    <nav className='fixed w-full z-50 top-0 bg-blue-500 py-3 px-3 md:px-10 justify-between flex items-center'>
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
    </nav>
  )
}

export default Navbar
