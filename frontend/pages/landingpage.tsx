"use client";

import React, { useEffect, useState } from 'react'
import { check_env, do_init, swal_error, swal_success } from '@/src/helpers'
import { pvp } from '@/generated/constants';
import Image from 'next/image';
import Link from 'next/link';
import { SecretNetworkClient, Wallet } from 'secretjs';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

function LandingPage() {

  const [is_game_night, setGameNight] = useState(false);   
  const { push } = useRouter();
  const [show_wallets, setShowWallets] = useState(false);

  const handleConnect = async () =>{

    let wallets = [];
      //@ts-ignore
    if (window.keplr) wallets.push('Keplr');
    //@ts-ignore
    if (window.leap) wallets.push('Leap');
     //@ts-ignore
    if (window.ethereum) wallets.push('MetaMask');
    //@ts-ignore
    if (window.fina) wallets.push('Fina');

    if (wallets.length==1) {
      await swal_success(`${wallets[0]} wallet detected!`);
      // do init
      await try_enter_game(wallets[0]);
    } else  {
      // show wallet options
      setShowWallets(true);
    }
  }

  const try_enter_game = async ( wallet: string) => {
    setShowWallets(false);
    if (await do_init(wallet)) {
      await check_env();
      push('/dashboard');

    }
  }


  useEffect( function() {

    // detect whether there are multiple wallets

      (async function () {
        
        let wallet = new Wallet();

        let cli = new SecretNetworkClient({                      
          url: pvp.LCD_URL,   
          wallet: wallet,                                 
          walletAddress: wallet.address,                  
          chainId: pvp.CHAIN_ID,                            
          });

        pvp.set_code_hash(cli);

      })();

  }, []);

  return (
    <>
      <div className='grid relative border-solid border-white place-items-center bg-black h-screen w-screen'>

        <Image
            src={`/images/${is_game_night ? 'gamenight' : 'banner' }.png`}
            alt={`banner.png`}
            fill={true}
            style={{objectFit:"cover"}}
          />

        <div className=' absolute w-1/2 h-48 pl-5 right-0 top-1/3 rounded-l-2xl select-none rainbow-bg'>
          <Image 
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-full rounded-l-2xl select-none"
              alt='header' 
              src="/images/header.png"
              />
          </div>

        <div 
        onClick={async e => await handleConnect() }

        className={`p-4 m-auto absolute bottom-48 left-0 right-0
        bg-red-900 text-white text-center w-fit
        select-none hover:bg-red-600 rounded-lg shadow-retro`}>
        Connect Wallet 
        </div>

        <motion.div
        animate={{ opacity: show_wallets ? 1: 0, scale: show_wallets ? 1: 0}}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        className={` ${show_wallets ? '':'hidden'}
        absolute bg-red-600 h-fit text-center
         top-0 bottom-0 left-0 right-0 m-auto z-50
         p-4 rounded-2xl w-1/3`}>
          <h1 className='px-2 py-4 text-base rounded-2xl'>Choose your wallet</h1>
          <ul>
            <li className='py-4 hoverrainbow hover:bg-indigo-900 rounded-2xl' onClick={async _ => await try_enter_game('Keplr')}>Keplr</li>
            <li className='py-4 hoverrainbow hover:bg-indigo-900 rounded-2xl' onClick={async _ => await try_enter_game('MetaMask')}>MetaMask</li>
            <li className='py-4 hoverrainbow hover:bg-indigo-900 rounded-2xl' onClick={async _ => await try_enter_game('Fina')}>Fina</li>
            <li className='py-4 hoverrainbow hover:bg-indigo-900 rounded-2xl' onClick={async _ => await try_enter_game('Leap')}>Leap</li>
          </ul>
        </motion.div>

      </div> 
    </>
  
  )
}

export default LandingPage