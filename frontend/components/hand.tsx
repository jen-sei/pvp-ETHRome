import { numberToImg } from '@/src/helpers';
import React from 'react'
import Image  from 'next/image'

interface HandProps {
    hand : number[],
    unheld: Set<number>,
    setUnheld:  React.Dispatch<React.SetStateAction<Set<number>>>,

}


function Hand(props : HandProps) {

  const handleClickCard = (num : number) => {
    if (props.unheld.has(num)) {
      // remove it from the unheld set
      props.setUnheld(prev_set => new Set([...prev_set].filter(x => x !== num)))
    } else {
      // add it to the unheld set
      props.setUnheld(prev_set => new Set<number>([...prev_set, num]))
    }

  }
  return (
    <>
      <div
        onClick={_ => handleClickCard(0)}
        className='m-auto left-0 right-0 float-left w-1/5 h-full relative'>
          <Image 
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-48 top-0 left-0 absolute select-none"
          alt='hand4' 
          src={`/deck/${numberToImg(props.hand[0] || 255)}.png`}
          />
          <div className={
            `absolute left-9 top-0 w-40 h-48 rainbow-bg 
            select-none rounded
            ${!props.unheld.has(0) ? 'hidden' :'opacity-25'}`}>
          </div>
      </div>

      <div
        onClick={_ => handleClickCard(1)}
        className='m-auto left-0 right-0 float-left w-1/5 h-full relative'>
          <Image 
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-48 top-0 left-0 absolute select-none"
          alt='hand4' 
          src={`/deck/${numberToImg(props.hand[1] || 255)}.png`}
          />
          <div className={
            `absolute left-9 top-0 w-40 h-48 rainbow-bg 
            select-none rounded
            ${!props.unheld.has(1) ? 'hidden' :'opacity-25'}`}>
          </div>
      </div>

      <div
        onClick={_ => handleClickCard(2)}
        className='m-auto left-0 right-0 float-left w-1/5 h-full relative'>
          <Image 
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-48 top-0 left-0 absolute select-none"
          alt='hand4' 
          src={`/deck/${numberToImg(props.hand[2] || 255)}.png`}
          />
          <div className={
            `absolute left-9 top-0 w-40 h-48 rainbow-bg 
            select-none rounded
            ${!props.unheld.has(2) ? 'hidden' :'opacity-25'}`}>
          </div>
      </div>

      <div
        onClick={_ => handleClickCard(3)}
        className='m-auto left-0 right-0 float-left w-1/5 h-full relative'>
          <Image 
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-48 top-0 left-0 absolute select-none"
          alt='hand4' 
          src={`/deck/${numberToImg(props.hand[3] || 255)}.png`}
          />
          <div className={
            `absolute left-9 top-0 w-40 h-48 rainbow-bg 
            select-none rounded
            ${!props.unheld.has(3) ? 'hidden' :'opacity-25'}`}>
          </div>
      </div>

      <div
        onClick={_ => handleClickCard(4)}
        className='m-auto left-0 right-0 float-left w-1/5 h-full relative'>
          <Image 
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-48 top-0 left-0 absolute select-none"
          alt='hand4' 
          src={`/deck/${numberToImg(props.hand[4] || 255)}.png`}
          />
          <div className={
            `absolute left-9 top-0 w-40 h-48 rainbow-bg 
            select-none rounded
            ${!props.unheld.has(4) ? 'hidden' :'opacity-25'}`}>
          </div>
      </div>

    </>


  )
}

export default Hand