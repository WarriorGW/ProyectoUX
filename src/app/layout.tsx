import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { Onest } from "next/font/google"
import QueryProvider from "@/util/QueryProvider"

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
        <Navbar />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
