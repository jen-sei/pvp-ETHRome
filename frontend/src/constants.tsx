export const ERR_UNAUTHORISED = new RegExp("Unauthorised.")

/******************************************************************************
Secret
******************************************************************************/

import { QueryCodeHashResponse } from "secretjs/src/grpc_gateway/secret/compute/v1beta1/query.pb";
import { MsgExecuteContract, MsgGrantAllowance, SecretNetworkClient, TxResponse, Wallet, stringToCoins } from "secretjs";
import { random_string, swal_confirm, swal_error } from "@/src/helpers";
import { send_tx } from "@/src/transactions";

export class Pvp {

  /// BEGIN AUTOGEN METADATA 
  declare PVP_VERSION : string;
  declare CONTRACT_ADDRESS  : string;
  declare CODE_ID           : number;
  declare CHAIN_ID          : string;
  declare LCD_URL           : string;
  /// END AUTOGEN

  cli         : SecretNetworkClient = {} as SecretNetworkClient;
  granter     : SecretNetworkClient = {} as SecretNetworkClient;
  code_hash   : string      = '';
  ready       : boolean = false;
  enable_alias : boolean = false;
  viewing_key         : string      = '';

  constructor () {};


  set_cli( cli : SecretNetworkClient) {
    this.cli = cli;
  }

  set_granter( granter : SecretNetworkClient) {
    this.granter = granter;
  }
  

  set_enable_alias( enable : boolean ) {
    this.enable_alias = enable;
  }


  set_viewing_key( vk : string) {
    this.viewing_key = vk;
    window.localStorage.setItem('pvp_viewing_key', pvp.viewing_key);
  }

  async set_code_hash( querier : SecretNetworkClient | null = null) {

    let cli = querier ? querier : this.cli;
    this.code_hash = (await cli?.query.compute.codeHashByCodeId({code_id: String(this.CODE_ID)})
    .catch(async (e: any) => { 
        console.log(`failed to get code hash:\n${JSON.stringify(e)}`);
      return ""
    }) as QueryCodeHashResponse).code_hash as string;

  }

  async generate_vk() : Promise<boolean> {

    if( !(await swal_confirm('generate a viewing key?'))) {
      return false;
    }
    
    let entropy = random_string();

    let set_vk_result = await send_tx(this.code_hash as string,
      {set_viewing_key: { key: entropy }}, 
      [], 55_000, (pvp.enable_alias? pvp.cli: pvp.granter)) as TxResponse;
    
    if (set_vk_result.arrayLog) {
      this.viewing_key = set_vk_result.arrayLog[6].value;
    } else if (typeof set_vk_result === 'string' ) {
      await swal_error(set_vk_result);
      return false;
    }

    window.localStorage.setItem('pvp_viewing_key', pvp.viewing_key);

    return true
  }

  async generate_alias() {

    const newWallet = new Wallet();

    const grantee = new SecretNetworkClient({
      url: pvp.LCD_URL,
      chainId: this.CHAIN_ID,
      wallet: newWallet,
      walletAddress: newWallet.address,
    });

    const grant_allow_msg = new MsgGrantAllowance (
      {
        granter: this.granter.address,
        grantee: newWallet.address,
        allowance: {
          spend_limit: stringToCoins("15000000uscrt"),
        },
      });

    const set_alias_msg = new MsgExecuteContract (
      {
        sender: this.granter.address,
        contract_address: pvp.CONTRACT_ADDRESS,
        code_hash: pvp.code_hash,
        msg: {set_alias: {alias: grantee.address } },
        sent_funds: [],
      },

    );

    const tx = await this.granter.tx.broadcast([grant_allow_msg, set_alias_msg], {
      gasLimit: 66_000,
      gasPriceInFeeDenom: 0.1,
      feeDenom: "uscrt",
      });

    if (typeof tx === 'string' || (tx as TxResponse).code !== 0 ) {
      await swal_error('fee-grant tx failed!');
      console.log(tx);
      return !await swal_confirm("try again?")
    }

    pvp.set_cli(grantee);
    window.localStorage.setItem('pvp_alias_cli_mnem', newWallet.mnemonic);
    return true;

    }
  }

export var pvp = new Pvp();