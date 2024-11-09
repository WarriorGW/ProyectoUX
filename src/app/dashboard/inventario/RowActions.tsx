// import DrawerDialog from "@/components/DrawerDialog"
// import IconMenu from "@/components/IconMenu"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Row } from "@tanstack/react-table"
// import { MoreHorizontal, SquarePen, Trash2 } from "lucide-react"
// import { useState } from "react"
// import ProductsForm from "./ProductsForm"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog"
// import { useMutation } from "@tanstack/react-query"
// import { deleteProduct } from "./actions"
// import { revalidatePath } from "next/cache"

// interface WithId<T> {
//   id: string
// }
// interface DataTableRowActionsProps<TData> {
//   row: Row<TData>
// }

// function RowActions<TData extends WithId<string>>({
//   row,
// }: DataTableRowActionsProps<TData>) {
//   const [isEditOpen, setIsEditOpen] = useState(false)
//   const [isDeleteOpen, setIsDeleteOpen] = useState(false)

//   const dlt = useMutation({
//     mutationKey: ["deleteProduct"],
//     mutationFn: async (id: string) => {
//       deleteProduct(id)
//       // revalidatePath("/dashboard/inventario")
//     },
//   })

//   return (
//     <>
//       <DrawerDialog
//         title='Editar producto'
//         isOpen={isEditOpen}
//         setIsOpen={setIsEditOpen}
//       >
//         <ProductsForm editID={row.original.id} setIsOpen={setIsEditOpen} />
//       </DrawerDialog>

//       <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>¿Estas seguro?</AlertDialogTitle>
//             <AlertDialogDescription>
//               Esta acción no se puede deshacer. Eliminará permanentemente el
//               producto del servidor.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancelar</AlertDialogCancel>
//             <AlertDialogAction onClick={() => dlt.mutate(row.original.id)}>
//               Aceptar
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>

//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant='ghost' className='h-8 w-8 p-0'>
//             <span className='sr-only'>Open menu</span>
//             <MoreHorizontal className='h-4 w-4' />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align='end' className='w-[160px] z-50'>
//           <DropdownMenuItem className='group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 '>
//             <button
//               onClick={() => {
//                 setIsEditOpen(true)
//                 // setTimeout(() => (document.body.style.pointerEvents = ""), 0)
//               }}
//               className='w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100'
//             >
//               <IconMenu text='Edit' icon={<SquarePen className='h-4 w-4' />} />
//             </button>
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem className='group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 '>
//             <button
//               onClick={() => {
//                 setIsDeleteOpen(true)
//               }}
//               className='w-full justify-start flex text-red-500 rounded-md p-2 transition-all duration-75 hover:bg-neutral-100'
//             >
//               <IconMenu text='Delete' icon={<Trash2 className='h-4 w-4' />} />
//             </button>
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </>
//   )
// }

// export default RowActions
