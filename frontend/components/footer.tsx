"use client";

import { pvp } from "@/generated/constants";
import { green, } from "@/src/helpers";
import Link from "next/link";

function Footer() {


  return (
    <div className={`relative grid place-items-center bg-black w-screen p-5`}>


      <div id='footer' className={`grid grid-cols-1 grid-rows-2 text-white p-5 bg-black w-fit place-items-center`}>

        <div key='footer about table' className={`table`}>

          <div className="table-header-group">
            <div className="table-row text-bold select-none">
              <div className="table-cell text-center px-2 font-bold">{'\u2660'} About {'\u2660'}</div>
            </div>
          </div>

          <div className="table-row-group">

            <div className="table-row text-bold select-none">
              <div className="table-cell text-center px-2">Built on: <Link href='https://scrt.network/' rel="noopener noreferrer" target="_blank" >{green('Secret Network')}</Link></div>
            </div>

            <div className="table-row text-bold select-none">
              <div className="table-cell text-center px-2">RNG powered by: <Link href='https://docs.scrt.network/secret-network-documentation/development/development-concepts/randomness-api' rel="noopener noreferrer" target="_blank" >{green('Secret VRF')}</Link></div>
            </div>

            <div className="table-row text-bold select-none">
              <div className="table-cell text-center px-2">Version: {pvp.PVP_VERSION}</div>
            </div>

            <div className="table-row text-bold select-none">
              <div className="table-cell text-center px-2">Contract: {pvp.CONTRACT_ADDRESS}</div>
            </div>



          </div>
        </div>

        <div key='footer contact table' className={`table`}>

          <div className="table-header-group">

          </div>

          <div className="table-row-group">

          </div>

        </div>

      </div>

      <div className={`grid text-white p-2 bg-black w-screen place-items-center`}>© PVP 2023. All Rights Reserved.</div>
    </div>


  )
}

export default Footer