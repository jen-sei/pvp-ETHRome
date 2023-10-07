import BettingTable from '@/components/betting_table'
import Controls from '@/components/controls';
import Hand from '@/components/hand'
import { InstanceState } from '@/src/interfaces';
import { instance_state } from '@/src/queries';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { pvp } from '@/generated/constants';
import Image  from 'next/image'



function Dashboard() {

  const { push } = useRouter();
  const [hand, setHand] = useState([255,255,255,255,255]);
  const [bet, setBet] = useState(1);
  const [dealt, setDealt] = useState(false);
  const [outcome, setOutcome] = useState('UNDEFINED');
  const [won, setWon] = useState('-');

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
        setWon(inst_state.last_win);

      } else {
       
      }

      console.log(inst_state_result[0]);
    }

    do_query();

    // check state every 7 seconds
    const id = setInterval(do_query, 7000);
    return () => clearInterval(id);
  },[ dealt]);



  return (
    <div className='w-screen h-screen relative'>
      <BettingTable bet={bet}/>

      <div className='w-2/3 h-48 left-0 right-0 m-auto'>
          <Hand hand={hand}/>
      </div>

      <div>
        Outcome: {outcome}
      </div>
      <div>
        Won: {won}
      </div>

        <Controls bet={bet} setBet={setBet} dealt={dealt} setDealt={setDealt}/>
      

    </div>
  )
}

export default Dashboard