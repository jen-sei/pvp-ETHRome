import { pvp } from "@/generated/constants"
import * as i from "./interfaces"
import { QueryBalanceResponse } from "secretjs/dist/extensions/snip1155/msg/getBalance";
import { SecretNetworkClient } from "secretjs";
import { currency_str } from "./helpers";

export async function balance() : Promise<[string, string]> {

    const { balance } = await pvp.granter?.query.bank.balance({
        address: pvp.granter.address,
        denom: "uscrt",
      }) as QueryBalanceResponse;
  
    let balance_print = currency_str(balance?.amount, 'uscrt');
    let balance_amount = balance_print[0];
    let balance_denom = balance_print[1];

    return [balance_amount, balance_denom]
}


export async function instance_state():  Promise<[i.InstanceState | any, boolean ]>  {


    let handInfo : i.InstanceState | any = await pvp.granter?.query.compute.queryContract({
        contract_address: pvp.CONTRACT_ADDRESS,
        code_hash: pvp.code_hash,
        query: { instance_state : { 
        sender_addr : pvp.granter.address, 
        sender_key: pvp.viewing_key
    }},
    }).catch(async (e: any) => {
        
        return [{}, false];
    });

    return [handInfo, i.isInstanceState(handInfo)];
}
