import { pvp } from '@/generated/constants'
import { swal_error } from '@/src/helpers'
import { send_tx } from '@/src/transactions'
import React from 'react'


interface ControlsProps {
    bet: number,
    dealt: boolean,
    setBet: React.Dispatch<React.SetStateAction<number>>,
    setDealt: React.Dispatch<React.SetStateAction<boolean>>,
    need_vk: boolean,
    setNeedVk: React.Dispatch<React.SetStateAction<boolean>>,
    held: Set<number>,
    setHeld: React.Dispatch<React.SetStateAction<Set<number>>>,
}
function Controls( props : ControlsProps) {

    const handleSetVk = async () => {
        props.setNeedVk(!(await pvp.generate_vk()));
    }

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
        props.setHeld(new Set<number>([]));
    }

    const handleDraw = async () => {
        let tx = await send_tx(
            pvp.code_hash, 
            { draw : { held: Array.from(props.held) }},
            [], 66_000);

        if (typeof tx === 'string') {

            swal_error (tx);
            return;
        }
        props.setDealt(false);

    }
    
  return (
    <div className='absolute m-auto bottom-5 p-4 left-0 right-0 w-full h-fit'>
        <div 
        onClick={async _ => { if (props.need_vk) await handleSetVk()}} 
        className={`float-left bg-red-300 p-4 rounded-l-2xl hover:bg-red-600 ${props.need_vk ? 'rainbow-bg' :'opacity-50'}`}>
            {props.need_vk ? 'set viewing key' : 'viewing!'}
        </div>

        <div 
        onClick={_ => { if (props.bet>1) props.setBet(props.bet-1) }} 
        className='float-left bg-red-300 p-4 hover:bg-red-600 no-select'>
            down bet
        </div>

        <div 
        className='float-left bg-red-600 p-4 no-select'>
            bet {props.bet}
        </div>

        <div 
        onClick={_ => { if (props.bet<5) props.setBet(props.bet+1) }} 
        className='float-left bg-red-300 p-4 hover:bg-red-600 no-select'>
            up bet
        </div>

        <div 
        onClick={async _ => {  if (!props.need_vk) {props.dealt? await handleDraw() : await handleDeal()} }}
        className={`float-left bg-red-300 rounded-r-2xl p-4 hover:bg-red-600 ${props.need_vk? 'opacity-50': ''}`}>
            {props.dealt ? 'draw':'deal'}
        </div>
    </div>
  )
}

export default Controls