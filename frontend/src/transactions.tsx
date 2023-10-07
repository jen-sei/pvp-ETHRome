
import { TxResponse, Coin, MsgExecuteContract } from "secretjs";
import { pvp } from "../generated/constants";

export async function send_tx (
  contractCodeHash: string, 
  msg: object, 
  sent: Coin[] = [],
  gas: number = 50_000,
  cli = pvp.granter): Promise<TxResponse | string> {

  if (!pvp.granter) {
    let msg = 'Failed to get Secret Client';
    console.error(msg);
    return msg;
  }
  

  let tx_resp = await  cli.tx.compute.executeContract(
    {
      sender: cli.address,
      contract_address: pvp.CONTRACT_ADDRESS,
      code_hash: contractCodeHash,
      msg: msg,
      sent_funds: sent,
    },

    {
      gasLimit: gas,
      feeGranter: (cli.address != pvp.granter.address) ? pvp.granter.address : undefined,
    }

  ).catch(e => {
      return `send tx failed: ${JSON.stringify(e)}`
  });
  

  // gas manangement
  if ((tx_resp as TxResponse).code != 0) {

      if ((tx_resp as TxResponse).rawLog) {
        return `${(tx_resp as TxResponse).rawLog}`;
      } else {
        return `${tx_resp}`;
      }
      
  }

  return tx_resp as TxResponse;
}
