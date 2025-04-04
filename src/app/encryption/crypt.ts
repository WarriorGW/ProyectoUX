import CryptoJS from "crypto-js"

const SECRET_KEY = "TuClaveSecreta123456" // ⚠️ Debe ser segura y guardarse en variables de entorno

export function encryptAES(text: string): string {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString()
}

export function decryptAES(encryptedText: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}
