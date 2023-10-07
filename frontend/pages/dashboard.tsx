import BettingTable from '@/components/betting_table'
import Controls from '@/components/controls';
import Hand from '@/components/hand'
import { InstanceState } from '@/src/interfaces';
import { instance_state } from '@/src/queries';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { ERR_UNAUTHORISED, pvp } from '@/generated/constants';
import { currency_str } from '@/src/helpers';



function Dashboard() {

  const { push } = useRouter();
  const [hand, setHand] = useState([255,255,255,255,255]);
  const [bet, setBet] = useState(1);
  const [dealt, setDealt] = useState(false);
  const [outcome, setOutcome] = useState('UNDEFINED');
  const [won, setWon] = useState('-');
  const [need_vk, setNeedVk] = useState(false);
  const [held, setHeld] = useState(new Set<number>([]))


  useEffect(function () {

    if (!pvp.ready ) {
      push('/landingpage')
      return;
  }

   let do_query = async function(){
      let inst_state_result = await instance_state();
      if (inst_state_result[1]) {
        let inst_state = inst_state_result[0] as InstanceState;
        
        // sync state with backend
        setHand(inst_state.hand);
        setDealt(inst_state.dealt);
        setOutcome(inst_state.last_outcome);

        let won_curr = currency_str(inst_state.last_win, "uscrt");
        setWon(`${won_curr[0]} ${won_curr[1]}`);

      } else if (ERR_UNAUTHORISED.test(inst_state_result[0])){
        setNeedVk(true);
      } else {
        console.log(inst_state_result[0]);
        console.log(need_vk)

      }

    }

    do_query();

    // check state every 7 seconds
    const id = setInterval(do_query, 7000);
    return () => clearInterval(id);
  },[dealt]);



  return (
    <div className='w-screen h-screen relative'>
      <BettingTable bet={bet}/>

      <div className='w-2/3 h-60 left-0 right-0 m-auto'>
          <Hand 
          hand={hand}
          held={held}
          setHeld={setHeld}/>
      </div>

      <div className='m-auto left-0 right-0'>
        Outcome: {outcome}
      </div>

      <div className='p-2'>
        Won: {won}
      </div>

        <Controls 
          bet={bet} 
          setBet={setBet} 
          dealt={dealt} 
          setDealt={setDealt} 
          need_vk={need_vk} 
          setNeedVk={setNeedVk}
          held={held}
          setHeld={setHeld}/>
      

    </div>
  )
}

export default Dashboard