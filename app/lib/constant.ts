import { Connection } from "@solana/web3.js"
import axios from "axios";
import { SUPPORTED_TOKEN } from "../Tokens";

let LAST_UPDATED:number|null= null;
let REFRESH_TOKEN_PRICE_INTERVAL = 60 * 1000 //every 60s

let prices:{[key:string]:{
    price:string
}} = {}



export const connection = new Connection("https://api.devnet.solana.com");
// export const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/MK2kCfxX9GjvEpe9Az2vS7lp2wzHUid2");

export async function getSupportedTokens(){
    if(!LAST_UPDATED || new Date().getTime()-LAST_UPDATED < REFRESH_TOKEN_PRICE_INTERVAL ){
        try {
            const response = await axios.get("https://price.jup.ag/v6/price?ids=SOL,USDT,USDC");
            prices = response.data.data;
            LAST_UPDATED = new Date().getTime();
        } catch (error:any) {
            console.log(error.message)
        }
    }
   return  SUPPORTED_TOKEN.map(s=>({
        ...s,
        price:prices[s.name]?.price
    }))
}  