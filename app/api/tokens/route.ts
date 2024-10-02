import { NextRequest, NextResponse } from "next/server";
import {getAccount, getAssociatedTokenAddress, getMint} from "@solana/spl-token"
import { connection, getSupportedTokens } from "@/app/lib/constant";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";


export const GET = async(req:NextRequest)=>{
    const {searchParams} = new URL(req.url);
    const address = searchParams.get('address') as unknown as string;
    const supportedTokens = await getSupportedTokens()
    const balances = await Promise.all(supportedTokens.map(token=>getAccountBalance(token,address)));
    const tokens = supportedTokens.map((token,index)=>({
        ...token,
        balance:balances[index],
        usdBalance:Number(balances[index])*Number(token.price)
    }));
    return NextResponse.json({
        tokens,
        totalBalance:tokens.reduce((acc,inc)=>acc+inc.usdBalance,0)
    })
}



async function getAccountBalance(token: {
    name: string,
    mint: string,
    native:boolean,
    decimals:number
}, address: string) {
    if(token.native){
        let balance = await connection.getBalance(new PublicKey(address));
        return balance / LAMPORTS_PER_SOL
    }
    const ata = await getAssociatedTokenAddress(new PublicKey(token.mint), new PublicKey(address));
    try {
        const account = await getAccount(connection, ata);
        const mint = await getMint(connection,new PublicKey(token.mint));
        return Number(account.amount)/(10**token.decimals)
    } catch (error) {
        return 0
    }
}

