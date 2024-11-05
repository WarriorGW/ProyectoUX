import React from "react"
import { Button } from "./ui/button"

function LittleSpan({ quant }: { quant: number }) {
  return (
    <span
      style={{ "--i": quant } as React.CSSProperties}
      className='littleSpan'
    >
      <img
        className='littleImg'
        src={`http://dummyimage.com/337x10${quant}.png/5fa2dd/ffffff`}
        alt={`aleatorio ${quant}`}
      />
      <Button>Ver más</Button>
    </span>
  )
}

function Carrousel() {
  return (
    <div className='gallery relative w-[300px] h-[168px]'>
      <LittleSpan quant={1} />
      <LittleSpan quant={2} />
      <LittleSpan quant={3} />
      <LittleSpan quant={4} />
      <LittleSpan quant={5} />
      <LittleSpan quant={6} />
      <LittleSpan quant={7} />
      <LittleSpan quant={8} />
    </div>
  )
}

export default Carrousel
