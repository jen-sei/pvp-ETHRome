import { numberToImg } from '@/src/helpers';
import React from 'react'
import Image  from 'next/image'

interface HandProps {
    hand : number[],
    dealt: boolean,
    held: Set<number>,
    setHeld:  React.Dispatch<React.SetStateAction<Set<number>>>,

}


function Hand(props : HandProps) {

  const handleClickCard = (num : number) => {
    if (props.held.has(num)) {
      // remove it from the held set
      props.setHeld(prev_set => new Set([...prev_set].filter(x => x !== num)))
    } else {
      // add it to the unheld set
      props.setHeld(prev_set => new Set<number>([...prev_set, num]))
    }

  }
  return (
    <>
      <div
        onClick={_ => handleClickCard(props.hand[0])}
        className='float-left w-1/5 h-full'>
          <Image 
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-48 select-none"
          alt='hand4' 
          src={`/deck/${numberToImg(props.hand[0])}.png`}
          />
          <div className={`
          text-center w-full p-4 ${props.dealt? '':'hidden'}
          ${props.held.has(props.hand[0]) ? 'rainbow' :''} `}>
            {props.held.has(props.hand[0]) ? 'held!' : 'click to hold'}
          </div>
      </div>

      <div
        onClick={_ => handleClickCard(props.hand[1])}
        className='float-left w-1/5 h-full'>
          <Image 
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-48 select-none"
          alt='hand4' 
          src={`/deck/${numberToImg(props.hand[1])}.png`}
          />
          <div className={`
          text-center w-full p-4 ${props.dealt? '':'hidden'}
          ${props.held.has(props.hand[1]) ? 'rainbow' :''} `}>
            {props.held.has(props.hand[1]) ? 'held!' : 'click to hold'}
          </div>
      </div>

      <div
        onClick={_ => handleClickCard(props.hand[2])}
        className='float-left w-1/5 h-full'>
          <Image 
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-48 select-none"
          alt='hand4' 
          src={`/deck/${numberToImg(props.hand[2])}.png`}
          />
          <div className={`
          text-center w-full p-4 ${props.dealt? '':'hidden'}
          ${props.held.has(props.hand[2]) ? 'rainbow' :''} `}>
            {props.held.has(props.hand[2]) ? 'held!' : 'click to hold'}
          </div>
      </div>

      <div
        onClick={_ => handleClickCard(props.hand[3])}
        className='float-left w-1/5 h-full'>
          <Image 
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-48 select-none"
          alt='hand4' 
          src={`/deck/${numberToImg(props.hand[3])}.png`}
          />
          <div className={`
          text-center w-full p-4 ${props.dealt? '':'hidden'}
          ${props.held.has(props.hand[3]) ? 'rainbow' :''} `}>
            {props.held.has(props.hand[3]) ? 'held!' : 'click to hold'}
          </div>
      </div>

      <div
        onClick={_ => handleClickCard(props.hand[4])}
        className='float-left w-1/5 h-full'>
          <Image 
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-48 select-none"
          alt='hand4' 
          src={`/deck/${numberToImg(props.hand[4])}.png`}
          />
          <div className={`
          text-center w-full p-4 ${props.dealt? '':'hidden'}
          ${props.held.has(props.hand[4]) ? 'rainbow' :''} `}>
            {props.held.has(props.hand[4]) ? 'held!' : 'click to hold'}
          </div>
      </div>

    </>


  )
}

export default Hand