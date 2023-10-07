import { SecretNetworkClient, Wallet, MetaMaskWallet } from 'secretjs';
import swal from 'sweetalert';
import { QueryBalanceResponse } from 'secretjs/dist/extensions/snip1155/msg/getBalance';
import { pvp } from '@/generated/constants';

// maps a cad number to the corresponding image name
export function numberToImg(num : number): string {

  if (num == 255) {
    return 'back';
  }

  let [suit, rank] = translate_card(num);

  let rank_str = '';
  let suit_str = '';

  switch (rank) {
      case 0:
          rank_str = 'a'; // ace
          break;
      case 9:
          rank_str = '10' // 10 (only image name with two digits)
          break;
      case 10:
          rank_str = 'j' //jack
          break;
      case 11:
          rank_str = 'q' //queen
          break;
      case 12:
          rank_str = 'k' //king
          break;
      default:
          rank_str = JSON.stringify(rank+1)

  }

  switch (suit) {
      case 0:
          suit_str = 'c'; // clubs
          break;
      case 1:
          suit_str = 'd' // diamonds
          break;
      case 2:
          suit_str = 's' // spades
          break;
      case 3:
          suit_str = 'h' //hearts
          break;
  }
      
  // check for 10 condition (only numeric value with two digits)
  return rank_str.concat(suit_str);
}

export function translate_card(value : number): [number, number] {

  let quot = Math.floor(value / 13);
  let rem = value % 13;

  let suit = 0
  if (quot == 0 || quot == 4 || quot == 8  || quot == 12 ) {suit = 0} else
  if (quot == 1 || quot == 5 || quot == 9  || quot == 13 ) {suit = 1} else
  if (quot == 2 || quot == 6 || quot == 10 || quot == 14 ) {suit = 2} else
  if (quot == 3 || quot == 7 || quot == 11 || quot == 15 ) {suit = 3} 

  return [suit, rem]
}


/******************************************************************************
random string
******************************************************************************/

export function random_string() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 64) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

/******************************************************************************
denom conversion
******************************************************************************/

const microdenoms = ['uscrt'];
export function currency_str(amount : string, denom : string) : [string, string] {
  let amount_int = parseInt(amount);
  let amount_str = (isNaN(amount_int) ? 'NaN' : String(amount_int.toFixed(2)));

  if (microdenoms.includes(denom)) {

    denom = denom.substring(1);
    amount_str = (isNaN(amount_int) ? 'NaN' : String((amount_int/1e6).toFixed(2)))
  }
  return [amount_str, denom]
}

export const check_alias_cli = async () => {
  
  // if cli exists in local storage, check if it is alias of granter
  let storage_cli_mnem = window.localStorage.getItem('alias_cli_mnem');
  if (storage_cli_mnem) {

    let wallet = new Wallet(storage_cli_mnem); 
    const grantee = new SecretNetworkClient({
      url: pvp.LCD_URL,
      chainId: pvp.CHAIN_ID,
      wallet: wallet,
      walletAddress: wallet.address,
    });

    // wipe the old one
    window.localStorage.removeItem('pvp_alias_cli_mnem');

  }

  let enable_alias = await  swal_confirm(
`Enable an Alias client for in-game actions? (highly recommended).

An Alias client is a generated client which uses the fee-grant feature, allowing you to perform in-game only actions without needing to tediously double-confirm with your wallet every time.

This alias does not have access to your wallet funds.`, 'Enable Alias?');

  pvp.set_enable_alias(enable_alias);


  return false
}


const grant_alias_or_self = async ( granter: SecretNetworkClient) : Promise<boolean> => {

  if (!pvp.enable_alias) {
    return true;
  }
  return await pvp.generate_alias();
}

export const init_metamask = async (): Promise<SecretNetworkClient| null> => {

  let metamask = null;
  //@ts-ignore
  if (window.ethereum) {
    //@ts-ignore
    metamask = window.ethereum;
  } else {
    await swal_error('MetaMask wallet not detected!', '', 2000);
    return null
  }

  //@ts-ignore
  const [ethAddress] = await metamask.request({
    method: "eth_requestAccounts",
  });

  //@ts-ignore
  const wallet = await MetaMaskWallet.create(metamask, ethAddress);

  const chainId =  pvp.CHAIN_ID;

  const secretcli : SecretNetworkClient = new SecretNetworkClient({
    url: pvp.LCD_URL,
    chainId: chainId,
    wallet: wallet,
    walletAddress: wallet.address,
  });

  return secretcli
}

export const init_leap = async (): Promise<SecretNetworkClient | null> => {

  let leap = null;
    //@ts-ignore
    if (window.leap) {
      //@ts-ignore
      leap = window.leap;
    } else {
      await swal_error('Leap wallet not detected!', '', 2000);
      return null
    }

    const chainId =  pvp.CHAIN_ID;
    const key = await leap.getKey(chainId);
    window.addEventListener('leap_keystorechange', leap.getKey);

    const offlineSigner = await leap.getOfflineSignerOnlyAmino(chainId);
    const accounts = await offlineSigner.getAccounts();
      /*@ts-ignore */
    const enigmaUtils = window.getEnigmaUtils(chainId);

    const secretcli : SecretNetworkClient = new SecretNetworkClient({
      url: pvp.LCD_URL,
      chainId: chainId,
      wallet: offlineSigner,
      walletAddress: accounts[0].address,
      encryptionUtils: enigmaUtils,
    });

    return secretcli
  

}

export const init_fina = async (): Promise<SecretNetworkClient | null> => {
  //@ts-ignore
  if (window.fina) {
    //@ts-ignore
    pvp.set_mobile(true);
    return await init_keplr();
  } else {
    await swal_error('Fina wallet not detected!', '', 2000);
    return null;
  }
}


export const init_keplr = async (): Promise<SecretNetworkClient | null> => {
  let keplr = null;

  //@ts-ignore
  if (window.keplr) {
      //@ts-ignore
    keplr = window.keplr;
  } else {
    await swal_error('Keplr wallet not detected!', '', 2000);
    return null
  }
  const chainId = pvp.CHAIN_ID;

  // Enabling before using the Keplr is recommended.
  // This method will ask the user whether to allow access if they haven't visited this website.
  // Also, it will request that the user unlock the wallet if the wallet is locked.

  await keplr.enable(chainId);

  /*@ts-ignore */
  const offlineSigner = window.getOfflineSignerOnlyAmino(chainId);

  /*@ts-ignore */
  const enigmaUtils = window.getEnigmaUtils(chainId);


  
  // You can get the address/public keys by `getAccounts` method.
  // It can return the array of address/public key.
  // But, currently, Keplr extension manages only one address/public key pair.
  // XXX: This line is needed to set the sender address for SigningCosmosClient.
  const accounts = await offlineSigner.getAccounts();
  
  // Initialize the gaia api with the offline signer that is injected by Keplr extension.
  /*@ts-ignore */
  const secretcli : SecretNetworkClient = new SecretNetworkClient({
    url: pvp.LCD_URL,
    chainId: chainId,
    wallet: offlineSigner,
    walletAddress: accounts[0].address,
    encryptionUtils: enigmaUtils,
  });


  return secretcli;
}


export const do_init = async (wallet: string) => {
  let secretcli = null;

  if (wallet=='Keplr') secretcli = await init_keplr();
  else if (wallet=='MetaMask') secretcli = await init_metamask();
  else if (wallet=='Fina') secretcli = await init_fina();
  else if (wallet=='Leap') secretcli = await init_leap();

  
  if (!secretcli) {
    return false;
  }

  pvp.set_granter(secretcli);
  pvp.set_cli(secretcli);
  await pvp.set_code_hash(secretcli);

  const { balance } = await secretcli?.query.bank.balance({
    address: secretcli.address,
    denom: "uscrt",
  }) as QueryBalanceResponse;

  if (parseInt(balance.amount) == 0) {
    await swal_alert('You wont be able to perform basic actions (They will simply fail).', 'Your balance is zero!');
  }
  
  // if the storage to backend alias is a mismatch and the grant alias txn fails, return false
  if ( !(await check_alias_cli()) && !(await grant_alias_or_self(secretcli)) ) {
    return false;
  }

  pvp.ready = true;
  document.title = `Black Jack${pvp.CHAIN_ID.includes('pulsar') ? ' (testnet)' : ''}`

  return true;

}

export const check_env = async () => {


  let storage_vk = window.localStorage.getItem('pvp_viewing_key');

  if (storage_vk) {
    pvp.set_viewing_key(storage_vk);
  }

  if (!pvp.code_hash) {
    await pvp.set_code_hash();
  }

  return storage_vk;

}

export const swal_confirm = async ( message : string, title : string = '') : Promise<boolean> => {
  let result = false;
  await swal({
    title: title,
    text: message,  
    buttons: ["No!", "Go!"],
  }).then( (inner_result : boolean ) => { result = inner_result} );
  return result;
}

export const swal_input = async ( message : string, title : string = '', placeholder : string = '') : Promise<string> => {
  let result = '';
  await swal({
    content: {
      element: "input",
      attributes: {
        placeholder: placeholder,
      },
    },
    title: title,
    text: message,
    buttons: ["Cancel", "Go!"],
  }).then( (inner_result : string) => { result = inner_result} );
  return result;
}

export const swal_error = async ( message : string, title : string = '', timer = 0) => {
  if (timer) {
    await swal ({
      title: title,
      icon: "error",
      text: message,
      timer: timer
    });
  } else {
    await swal ({
      title: title,
      icon: "error",
      text: message,
    });
  }
}

export const swal_alert = async ( message : string, title : string = '') => {
  await swal({
    title: title,
    icon: "info",
    text: message
  });
}

export const swal_success = async ( message: string, title: string = '', timer = 0) => {

  if (timer) {
    await swal ({
      title: title,
      icon: "success",
      text: message,
      timer: timer
    });
  } else {
    await swal ({
      title: title,
      icon: "success",
      text: message,
    });
  }

}




