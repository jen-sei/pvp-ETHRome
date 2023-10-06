
import { TxResponse, Coin, MsgExecuteContract } from "secretjs";
import { blackjack } from "../generated/constants";

export const MAX_RETRIES : number = 2;

export async function send_tx (
  contractCodeHash: string, 
  msg: object, 
  sent: Coin[] = [],
  gas: number = 50_000,
  attempt_no: number = 0,
  as_alias = false): Promise<TxResponse | string> {

  if (!blackjack.granter) {
    let msg = 'Failed to get Secret Client';
    console.error(msg);
    return msg;
  }
  
  let granter = blackjack.granter;
  let cli = blackjack.cli;

  let tx_resp = await  (as_alias ? cli : granter).tx.compute.executeContract(
    {
      sender: as_alias ? cli.address : granter.address,
      contract_address: blackjack.CONTRACT_ADDRESS,
      code_hash: contractCodeHash,
      msg: msg,
      sent_funds: sent,
    },

    {
      gasLimit: gas,
      feeGranter: as_alias ? granter.address : undefined,
    }

  ).catch(e => {
      return `send tx failed: ${JSON.stringify(e)}`
  });
  

  // gas manangement
  if ((tx_resp as TxResponse).code != 0) {

    if (attempt_no > MAX_RETRIES) {
      if ((tx_resp as TxResponse).rawLog) {
        return `${(tx_resp as TxResponse).rawLog}`;
      } else {
        return `${tx_resp}`;
      }
    }

    let gas_used = (tx_resp as TxResponse).gasUsed;

    if (gas_used > Number(blackjack.settings.gas_limit)) {

      return `cannot do tx: ${(tx_resp as TxResponse).rawLog}`;

    }

    if (attempt_no == MAX_RETRIES) {
      // final attempt
      return await send_tx(contractCodeHash, msg, sent, Number(process.env.GAS_LIMIT), attempt_no+1);
    }

    return await send_tx(contractCodeHash, msg, sent, gas_used, attempt_no+1);
  }

  return tx_resp as TxResponse;
}
