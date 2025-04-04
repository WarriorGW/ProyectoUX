"use client"

import BodyWrapper from "@/components/BodyWrapper"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { decryptAES, encryptAES } from "./crypt"

function Encryption() {
  const [text, setText] = useState("")
  const [encrypted, setEncrypted] = useState("")
  const [decrypted, setDecrypted] = useState("")

  const handleEncrypt = () => {
    const enc = encryptAES(text)
    setEncrypted(enc)
  }

  const handleDecrypt = () => {
    const dec = decryptAES(encrypted)
    setDecrypted(dec)
  }

  return (
    <BodyWrapper>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Escribe un texto'
        className='border p-2'
      />
      <Button
        onClick={handleEncrypt}
        className='ml-2 p-2 bg-blue-500 text-white'
      >
        Encriptar
      </Button>
      <p className='mt-2'>🔒 Encriptado: {encrypted}</p>

      <Button
        onClick={handleDecrypt}
        className='mt-2 p-2 bg-green-500 text-white'
      >
        Desencriptar
      </Button>
      <p className='mt-2'>🔓 Desencriptado: {decrypted}</p>
    </BodyWrapper>
  )
}

export default Encryption
