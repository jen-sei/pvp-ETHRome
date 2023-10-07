import BettingTable from '@/components/betting_table'
import Controls from '@/components/controls';
import Hand from '@/components/hand'
import { InstanceState } from '@/src/interfaces';
import { instance_state } from '@/src/queries';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { pvp } from '@/generated/constants';


function Dashboard() {

  const { push } = useRouter();
  const [hand, setHand] = useState([255,255,255,255,255]);
  const [bet, setBet] = useState(1);
  const [dealt, setDealt] = useState(false);


  useEffect(function () {

    if (!pvp.ready ) {
      push('/landingpage')
      return;
  }

    (async function(){
      let inst_state_result = await instance_state();
      if (inst_state_result[1]) {
        let inst_state = inst_state_result[0] as InstanceState;
        
        // sync state with backend
        setHand(inst_state.hand);
        setDealt(inst_state.dealt);

      } else {
        console.log(inst_state_result[0]);
      }
    })();
  },[ dealt]);



  return (
    <div className='w-screen h-screen'>
      <BettingTable bet={bet}/>
      <Hand hand={hand}/>
      <Controls bet={bet} setBet={setBet} dealt={dealt} setDealt={setDealt}/>
      <div id='control buttons'></div>
    </div>
  )
}

export default Dashboard