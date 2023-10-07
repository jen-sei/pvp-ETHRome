import { pvp } from "@/generated/constants"
import * as h from "./helpers"
import * as i from "./interfaces"
import { QueryBalanceResponse } from "secretjs/dist/extensions/snip1155/msg/getBalance";
import { SecretNetworkClient } from "secretjs";
import { swal_error } from "./helpers";


export async function instance_state():  Promise<[i.InstanceState | any, boolean ]>  {


    let handInfo : i.InstanceState | any = await pvp.cli?.query.compute.queryContract({
        contract_address: pvp.CONTRACT_ADDRESS,
        code_hash: pvp.code_hash,
        query: { instance_state : { 
        sender_addr : pvp.cli.address, 
        sender_key: pvp.viewing_key
    }},
    }).catch(async (e: any) => {
        
        return [{}, false];
    });

    return [handInfo, i.isInstanceState(handInfo)];
}
