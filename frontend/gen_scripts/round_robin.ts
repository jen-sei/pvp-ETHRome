import { Wallet, SecretNetworkClient } from "secretjs";

let chain_id = 'pulsar-3';
const WALLETS : Wallet[] = [

    new Wallet("claim gossip build lecture fish draft test artwork nerve picnic cool horse bulk interest jungle solar group dice clarify trap allow version ketchup recipe"),

    new Wallet("oak glance forest immune blue thing depth range income marine tone moment until assault crumble culture case cliff strike reject cinnamon people brother crash"),

    new Wallet("logic common below soda pledge document embark floor disease electric ghost zoo much execute then card tuna try demand oyster canyon mirror umbrella eight"),

    new Wallet("vital arm gesture female meat scene rule kid toddler rail love whale truth rebuild man obtain purpose affair predict athlete giant roof lumber still"),

    new Wallet("dash chunk march liar bubble view donkey barely save glance example history today judge floor put season supreme abstract early travel sense tuna elite"),

    new Wallet("off title hurdle select grace amount bonus then night wagon gate enjoy wife fresh worry giraffe volcano social napkin spy melt romance just humble"),
    
];

const URLS : string[] = [
    //'http://testnet.securesecrets.org:1317',
    //'https://lcd.testnet.secretsaturn.net',
    //'https://api.pulsar.scrttestnet.com',
    'https://api.pulsar3.scrttestnet.com'
]                                            

function make_cli(wallet : Wallet, url : string) : SecretNetworkClient {
    return new SecretNetworkClient({                      
        url: url,   
        wallet: wallet,                                 
        walletAddress: wallet.address,                  
        chainId: chain_id,                            
        })
};

export class RoundRobin {
    wallet_idx : number;
    ep_index : number;

    constructor () {
        this.wallet_idx = 0;
        this.ep_index = 0;
    }

    cli() : [SecretNetworkClient, string] {
        let wallet = WALLETS[this.wallet_idx];
        let url = URLS[this.ep_index];
        this.wallet_idx =  (this.wallet_idx + 1) % WALLETS.length;

        if (this.wallet_idx == 0) {
            this.ep_index = (this.ep_index + 1) % URLS.length;
        }

        return [make_cli(wallet, url), wallet.address];
    }

}
