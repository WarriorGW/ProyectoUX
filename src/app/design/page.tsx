import BodyWrapper from "@/components/BodyWrapper"

function Design() {
  return (
    <BodyWrapper>
      <div className='flex'>
        <div>
          <p className='text-xs'>Onest 12px</p>
          <p className='text-sm'>Onest 14px</p>
          <p className='text-base'>Onest 16px</p>
          <p className='text-xl'>Onest 20px</p>
          <p className='text-2xl'>Onest 24px</p>
          <p className='text-4xl'>Onest 40px</p>
        </div>
        <div className='flex gap-3'>
          <div className='aspect-square size-28 bg-[#3b82f6] border-2 flex justify-center items-center'>
            #3b82f6
          </div>
          <div className='aspect-square size-28 bg-yellow-400 border-2 flex justify-center items-center'>
            #facc15
          </div>
          <div className='aspect-square size-28 bg-yellow-500 border-2 flex justify-center items-center'>
            #eab308
          </div>
          <div className='aspect-square size-28 bg-[#fbfcfd] border-2 flex justify-center items-center'>
            #fbfcfd
          </div>
        </div>
      </div>
    </BodyWrapper>
  )
}

export default Design
