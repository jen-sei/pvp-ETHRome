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
        console.log(inst_state_result[0]);

      } else {
        console.log(inst_state_result[0]);
      }
    })();
  },[ dealt]);



  return (
    <div className='w-screen h-screen'>
      <BettingTable bet={bet}/>

        <div className='w-2/3 left-0 right-0 m-auto'>
            <Hand hand={hand}/>
        </div>

        <div className='absolute bottom-20 bg-green-300 w-full h-20'>
          <Controls bet={bet} setBet={setBet} dealt={dealt} setDealt={setDealt}/>
        </div>

    </div>
  )
}

export default Dashboard