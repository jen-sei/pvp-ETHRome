import { numberToImg } from '@/src/helpers';
import React from 'react'
import Image  from 'next/image'

interface HandProps {
    hand : number[]
}


function Hand(props : HandProps) {
  return (
    <>
        <div className='m-auto left-0 right-0 float-left w-1/5 h-5 relative'>
          <Image 
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto top-0 left-0 absolute select-none"
          alt='hand0' 
          src={`/deck/${numberToImg(props.hand[0])}.png`}
          />
        </div>

        <div className='m-auto left-0 right-0 float-left w-1/5 h-5 relative'>
          <Image 
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto top-0 left-0 absolute select-none"
          alt='hand1' 
          src={`/deck/${numberToImg(props.hand[1])}.png`}
          />
        </div>

        <div className='m-auto left-0 right-0 float-left w-1/5 h-5 relative'>
          <Image 
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto top-0 left-0 select-none"
          alt='hand2' 
          src={`/deck/${numberToImg(props.hand[2])}.png`}
          />
        </div>

        <div className='m-auto left-0 right-0 float-left w-1/5 h-5 relative'>
          <Image 
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto top-0 left-0 absolute select-none"
          alt='hand3' 
          src={`/deck/${numberToImg(props.hand[3])}.png`}
          />
        </div>

        <div className='m-auto left-0 right-0 float-left w-1/5 h-5 relative'>
          <Image 
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto top-0 left-0 absolute select-none"
          alt='hand4' 
          src={`/deck/${numberToImg(props.hand[4])}.png`}
          />
        </div>

    </>


  )
}

export default Hand