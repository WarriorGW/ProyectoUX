"use client"

// import ProductsTable from "./ProductsTable"
import DrawerDialog from "@/components/DrawerDialog"
import ProductsForm from "./ProductsForm"
// import { columns } from "./columns"
// import { useQuery } from "@tanstack/react-query"
// import { getProducts } from "./actions"
import { useState } from "react"

function AdminInventario() {
  const [isAddOpen, setIsAddOpen] = useState(false)
  // const { data, isPending, isError, error } = useQuery({
  //   queryKey: ["inventory"],
  //   queryFn: async () => {
  //     const inventory = await getProducts()
  //     return inventory
  //   },
  // })

  // if (isError) {
  //   console.error(error)
  // }

  return (
    <div className='size-full'>
      <DrawerDialog
        btnText='Agregar producto'
        title='Crear producto'
        description='Crea un producto nuevo'
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
      >
        <ProductsForm setIsOpen={setIsAddOpen} />
      </DrawerDialog>
      {/* <ProductsTable
        data={data ?? []}
        columns={columns}
        isLoading={isPending}
      /> */}
    </div>
  )
}

export default AdminInventario
