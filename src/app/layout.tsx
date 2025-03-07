import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import QueryProvider from "@/util/QueryProvider"
import type { Metadata } from "next"
import { Onest } from "next/font/google"
import "./globals.css"

const onest = Onest({
  weight: "variable",
  subsets: ["latin"],
  variable: "--onest",
})

export const metadata: Metadata = {
  title: "Proyecto UX",
  description: "Proyecto de Diseño UX",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={`${onest.variable}`}>
      <body className='font-onest grainy-light'>
        <QueryProvider>
          <Navbar />
          <div className='h-[13vh]' />
          <main className='min-h-[calc(100vh-10vh)]'>{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  )
}
