import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  const formatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  })

  return formatter.format(price)
}

// export function formatToURL(inputString: string): string {
//   return inputString.replace(/\s+/g, "-")
// }

// export function revertURL(inputString: string): string {
//   return inputString.replace(/-/g, " ")
// }

export function formatToURL(inputString: string): string {
  return encodeURI(inputString)
}

export function revertURL(inputString: string): string {
  return decodeURI(inputString).replace(/%2C/g, ",")
}

export function processParams(data: string) {
  return decodeURIComponent(data)
}
