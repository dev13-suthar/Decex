import { authConfig } from "@/app/lib/authoptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db";
import { Keypair, VersionedTransaction } from "@solana/web3.js";
import { connection } from "@/app/lib/constant";

export const POST = async(req:NextRequest)=>{
    const data:{
       quoteResponse:any 
    } = await req.json();
    const session = await getServerSession(authConfig);
    if(!session?.user){
        return NextResponse.json({
            error:"You are Not Logged In"
        },{status:401})
    }
    const solWallet = await prisma.solwallet.findFirst({
        where:{
            userId:session.user.uid
        }
    });
    if(!solWallet){
        return NextResponse.json({
            error:"No Wallet FOund"
        },{status:404})
    };
    const { swapTransaction } = await (
        await fetch("https://quote-api.jup.ag/v6/swap",{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                quoteResponse:data.quoteResponse,
                userPublicKey:solWallet.publicKey,
                wrapAndunwrapSol:true,
            })
        })
    ).json();

    const swapTransactionBuff = Buffer.from(swapTransaction,'base64');
    var transactions = VersionedTransaction.deserialize(swapTransactionBuff);
    const privateKey = getPrivateKeyFromDB(solWallet.privateKey)
    transactions.sign([privateKey]);
    const latestBlockHash = await connection.getLatestBlockhash(); //Gets the Latest Block for Transaction
    // Execute Transaction
    const rawTransaction = await transactions.serialize();
        // console.log(`Raw Transaction:${rawTransaction}`)
        const txid = await connection.sendRawTransaction(rawTransaction,{
            skipPreflight:true,
            maxRetries:2
        });
        // console.log(`Txid:${txid}`)
        await connection.confirmTransaction({
            blockhash:latestBlockHash.blockhash,
            lastValidBlockHeight:latestBlockHash.lastValidBlockHeight,
            signature:txid
        });
        return NextResponse.json({
            txid
        })
}

function getPrivateKeyFromDB(privateKey:string){
    const arr = privateKey.split(",").map(x=>Number(x));
    const privateKeyUIntArr = Uint8Array.from(arr);
    const keyPair = Keypair.fromSecretKey(privateKeyUIntArr);
    return keyPair
}