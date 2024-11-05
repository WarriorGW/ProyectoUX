import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronsUpDown, CreditCard, Trash2 } from "lucide-react"
import BodyWrapper from "@/components/BodyWrapper"

function Cart() {
  return (
    <BodyWrapper className='flex gap-5'>
      <div className='bg-white p-10'>
        <h1 className='text-4xl'>Carrito</h1>
        <>
          <div className='flex flex-col'>
            {/* <Separator className='my-2' /> */}
            <div className='flex flex-row items-center justify-center'>
              <img
                src='http://dummyimage.com/314x388.png/cc0000/ffffff'
                alt='example'
                className='size-32 m-3'
              />
              <div className='flex flex-col gap-y-2'>
                <h2 className='text-xl font-semibold'>
                  Titulo del producto puede ser grande o tikito uwu
                </h2>
                <p className='text-lg'>
                  Detalles del producto, como descripcion y caracteristicas de
                  dicho producto
                </p>
                <div className='flex justify-between'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className='w-fit gap-x-3'
                        variant='outline'
                        size='sm'
                      >
                        Cantidad: {1} <ChevronsUpDown className='size-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>1</DropdownMenuItem>
                      <DropdownMenuItem>2</DropdownMenuItem>
                      <DropdownMenuItem>3</DropdownMenuItem>
                      <DropdownMenuItem>4</DropdownMenuItem>
                      <DropdownMenuItem>5</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant='destructive'
                    className='w-fit gap-x-3 '
                    size='sm'
                  >
                    <Trash2 className='size-4' />
                    Eliminar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
      <div className='bg-white p-10 h-fit flex flex-col gap-y-5'>
        Subtotal (+ Cantidad de productos)
        <strong>$2133.45</strong>
        <Button className='flex gap-x-2 bg-yellow-400 hover:bg-yellow-500 text-primary font-semibold text-lg antialiased'>
          Pagar <CreditCard className='size-5' />
        </Button>
      </div>
    </BodyWrapper>
  )
}

export default Cart
