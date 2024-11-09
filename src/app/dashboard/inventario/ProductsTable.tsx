// import { useState } from "react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table"
// import {
//   DropdownMenuTrigger,
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuCheckboxItem,
// } from "@/components/ui/dropdown-menu"
// import {
//   ArrowLeft,
//   ArrowLeftToLine,
//   ArrowRight,
//   ArrowRightToLine,
//   ChevronDown,
//   Trash2,
// } from "lucide-react"
// import { Inventory } from "@/types/Inventory"

// function ProductsTable({
//   data,
//   columns,
//   isLoading,
// }: {
//   data: Inventory[]
//   columns: ColumnDef<Inventory>[]
//   isLoading: boolean
// }) {
//   const [sorting, setSorting] = useState<SortingState>([])
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
//   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
//   const [pagination, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: 20,
//   })

//   const [searchBy, setSearchBy] = useState("nombre")

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     onColumnFiltersChange: setColumnFilters,
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onSortingChange: setSorting,
//     onPaginationChange: setPagination,
//     state: {
//       sorting,
//       pagination,
//       columnFilters,
//       columnVisibility,
//     },
//   })
//   return (
//     <>
//       <div className='flex items-center py-4'>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button
//               variant='outline'
//               className='rounded-r-none min-w-16 sm:min-w-20 md:min-w-40 lg:min-w-52'
//             >
//               <p className='hidden md:block'>Buscar por:&nbsp;</p>
//               <span className='capitalize'> {searchBy}</span>
//               <ChevronDown className='ml-1 md:ml-2 h-4 w-4' />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align='end'>
//             <DropdownMenuCheckboxItem
//               className='capitalize'
//               checked={searchBy === "id"}
//               onCheckedChange={() => {
//                 table.resetColumnFilters()
//                 setSearchBy("id")
//               }}
//             >
//               id
//             </DropdownMenuCheckboxItem>
//             <DropdownMenuCheckboxItem
//               className='capitalize'
//               checked={searchBy === "name"}
//               onCheckedChange={() => {
//                 table.resetColumnFilters()
//                 setSearchBy("name")
//               }}
//             >
//               name
//             </DropdownMenuCheckboxItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//         <Input
//           placeholder='Buscar...'
//           value={
//             searchBy === "nombre"
//               ? (table.getColumn("name")?.getFilterValue() as string) ?? ""
//               : searchBy === "id"
//               ? (table.getColumn("id")?.getFilterValue() as string) ?? ""
//               : ""
//           }
//           onChange={(event) =>
//             searchBy === "nombre"
//               ? table.getColumn("name")?.setFilterValue(event.target.value)
//               : searchBy === "id"
//               ? table.getColumn("id")?.setFilterValue(event.target.value)
//               : ""
//           }
//           className='max-w-sm rounded-none border-l-0 border-r-0'
//         />

//         <Button
//           variant='outline'
//           onClick={() => table.resetColumnFilters()}
//           className='rounded-l-none'
//         >
//           <Trash2 className='size-5' />
//         </Button>

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant='outline' className='ml-auto'>
//               Ver <ChevronDown className='ml-2 h-4 w-4' />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align='end'>
//             {table
//               .getAllColumns()
//               .filter((column) => column.getCanHide())
//               .map((column) => {
//                 return (
//                   <DropdownMenuCheckboxItem
//                     key={column.id}
//                     className='capitalize'
//                     checked={column.getIsVisible()}
//                     onCheckedChange={(value) =>
//                       column.toggleVisibility(!!value)
//                     }
//                   >
//                     {column.id}
//                   </DropdownMenuCheckboxItem>
//                 )
//               })}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       <div className='rounded-md border bg-white'>
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((hg) => (
//               <TableRow key={hg.id} className='*:text-center'>
//                 {hg.headers.map((h) => (
//                   <TableHead key={h.id}>
//                     {h.isPlaceholder
//                       ? null
//                       : flexRender(h.column.columnDef.header, h.getContext())}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {isLoading ? (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className='h-24 text-center'
//                 >
//                   Cargando ...
//                 </TableCell>
//               </TableRow>
//             ) : table.getRowModel().rows.length ? (
//               table.getRowModel().rows.map((r) => (
//                 <TableRow key={r.id} className='*:text-center'>
//                   {r.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className='h-24 text-center'
//                 >
//                   Sin resultados
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className='flex items-center justify-end space-x-2 py-4'>
//         <div className='space-x-2 flex flex-row items-center justify-center'>
//           {isLoading ? null : (
//             <>
//               <Button
//                 variant='outline'
//                 size='sm'
//                 className='flex flex-row gap-x-2'
//                 onClick={() => table.setPageIndex(0)}
//                 disabled={!table.getCanPreviousPage()}
//               >
//                 <ArrowLeftToLine className='h-4 w-4' />
//                 <p className='hidden md:block'>Primera</p>
//               </Button>
//               <Button
//                 variant='outline'
//                 size='sm'
//                 className='flex flex-row gap-x-2'
//                 onClick={() => table.previousPage()}
//                 disabled={!table.getCanPreviousPage()}
//               >
//                 <ArrowLeft className='h-4 w-4' />
//                 <p className='hidden md:block'>Anterior</p>
//               </Button>

//               <p className='mx-3 bg-white px-3 py-1 border rounded-md'>
//                 {table.getState().pagination.pageIndex + 1} de{" "}
//                 {table.getPageCount()}
//               </p>

//               <Button
//                 variant='outline'
//                 size='sm'
//                 className='flex flex-row gap-x-2'
//                 onClick={() => table.nextPage()}
//                 disabled={!table.getCanNextPage()}
//               >
//                 <p className='hidden md:block'>Siguiente</p>
//                 <ArrowRight className='h-4 w-4' />
//               </Button>
//               <Button
//                 variant='outline'
//                 size='sm'
//                 className='flex flex-row gap-x-2'
//                 onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//                 disabled={!table.getCanNextPage()}
//               >
//                 <p className='hidden md:block'>Última</p>
//                 <ArrowRightToLine className='h-4 w-4' />
//               </Button>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }

// export default ProductsTable
