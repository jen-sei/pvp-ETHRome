import { pvp } from '@/generated/constants'
import { random_string, swal_error } from '@/src/helpers'
import { send_tx } from '@/src/transactions'
import React from 'react'


interface ControlsProps {
    bet: number,
    dealt: boolean,
    setBet: React.Dispatch<React.SetStateAction<number>>,
    setDealt: React.Dispatch<React.SetStateAction<boolean>>,
}
function Controls( props : ControlsProps) {

    const handleDeal = async () => {
        let tx = await send_tx(
            pvp.code_hash, 
            { deal : { bet: props.bet}},
            [{ amount: String(props.bet * 1_000_000), denom: 'uscrt' }], 66_000);

        if (typeof tx === 'string') {

            swal_error (tx);
            return;
        }
        props.setDealt(true);
    }

    const handleDraw = async () => {
        let tx = await send_tx(
            pvp.code_hash, 
            { draw : { unheld: [1,2] }},
            [], 66_000);

        if (typeof tx === 'string') {

            swal_error (tx);
            return;
        }
        props.setDealt(false);

    }
    
  return (
    <>
    <div 
    onClick={async _ => {await pvp.generate_vk()}} 
    className='float-left bg-red-300 p-8 hover:bg-red-600'>
        set viewing key
    </div>

    <div 
    onClick={_ => props.setBet(props.bet-1)} 
    className='float-left bg-red-300 p-8 hover:bg-red-600'>
        down bet
    </div>

    <div 
    className='float-left bg-red-300 p-8 hover:bg-red-600'>
        bet {props.bet}
    </div>

    <div 
    onClick={_ => props.setBet(props.bet+1)} 
    className='float-left bg-red-300 p-8 hover:bg-red-600'>
        up bet
    </div>

    <div 
    onClick={async _ => { props.dealt? await handleDraw() : await handleDeal() }}
    className='float-left bg-red-300 p-8 hover:bg-red-600'>
        {props.dealt ? 'draw':'deal'}
    </div>
    </>
  )
}

export default Controls