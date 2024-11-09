// import SortingButton from "@/components/SortingButton"
// import { localeCompareSortingFn } from "@/lib/sortingFunctions"
// import { formatPrice, processCUID } from "@/lib/utils"
// import { Inventory } from "@/types/Inventory"
// import { ColumnDef } from "@tanstack/react-table"
// import RowActions from "./RowActions"

// export const columns: ColumnDef<Inventory>[] = [
//   {
//     accessorKey: "id",
//     header: "#",
//     cell: ({ row }) => <div>{processCUID(row.getValue("id"))}</div>,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "name",
//     header: ({ column }) => <SortingButton text='Nombre' column={column} />,
//     cell: ({ row }) => (
//       <div className='text-center'>{row.getValue("name")}</div>
//     ),
//     sortingFn: localeCompareSortingFn,
//   },
//   {
//     accessorKey: "quantity",
//     header: ({ column }) => <SortingButton text='Cantidad' column={column} />,
//     cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
//   },
//   {
//     accessorKey: "price",
//     header: ({ column }) => (
//       <SortingButton text='Precio base' column={column} />
//     ),
//     cell: ({ row }) => <div>{formatPrice(row.getValue("price"))}</div>,
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       return <RowActions row={row} />
//     },
//   },
// ]
