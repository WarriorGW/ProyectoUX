"use client"
import BodyWrapper from "@/components/BodyWrapper"
import Card from "@/components/Card"
// import Carrousel from "@/components/Carrousel"
import LoginModal from "@/components/LoginModal"
// import PRODUCTS from "@/lib/UX.json"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useEffect, useState } from "react"
import { useIntersectionObserver } from "usehooks-ts"
import { getProducts } from "./actions"
import { useQuery } from "@tanstack/react-query"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  // const [currentProducts, setCurrentProducts] = useState(PRODUCTS.slice(0, 20)) // Inicialmente 20 productos
  // const [page, setPage] = useState(1) // Para llevar el control de la página
  const { user, isLoading } = useKindeBrowserClient()

  const products = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const products = await getProducts()
      return products
    },
  })

  const { ref } = useIntersectionObserver({
    threshold: 0.5,
    onChange: (entry) => {
      if (entry) {
        // loadMoreProducts()
      }
    },
  })

  // const loadMoreProducts = () => {
  //   const nextPageProducts = PRODUCTS.slice(page * 20, (page + 1) * 20)
  //   if (nextPageProducts.length > 0) {
  //     setCurrentProducts((prevProducts) => [
  //       ...prevProducts,
  //       ...nextPageProducts,
  //     ])
  //     setPage(page + 1)
  //   }
  // }

  useEffect(() => {
    if (!user && !isLoading) {
      setIsOpen(true)
    }
  }, [user, isLoading])

  return (
    <BodyWrapper className='flex flex-wrap items-center justify-center gap-5'>
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className='flex flex-wrap items-center justify-center gap-5'>
        {products.isLoading ? (
          <div className='flex flex-col gap-y-5 justify-center items-center'>
            <img src='logo.png' alt='' className='size-48' />
            <p>Cargando...</p>
          </div>
        ) : products.data ? (
          products.data.map((p) => <Card key={p.id} product={p} />)
        ) : (
          <>No hay datos</>
        )}
        <div ref={ref}></div>
      </div>
    </BodyWrapper>
  )
}
