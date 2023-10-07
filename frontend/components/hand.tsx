import { numberToImg } from '@/src/helpers';
import React from 'react'

interface HandProps {
    hand : number[]
}


function Hand(props : HandProps) {
  return (
    <>
        <div className='float-left w-1/5'><img src={`/deck/${numberToImg(props.hand[0])}.png`}/></div>
        <div className='float-left w-1/5'><img src={`/deck/${numberToImg(props.hand[1])}.png`}/></div>
        <div className='float-left w-1/5'><img src={`/deck/${numberToImg(props.hand[2])}.png`}/></div>
        <div className='float-left w-1/5'><img src={`/deck/${numberToImg(props.hand[3])}.png`}/></div>
        <div className='float-left w-1/5'><img src={`/deck/${numberToImg(props.hand[4])}.png`}/></div>
    </>


  )
}

export default Hand