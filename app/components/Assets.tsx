"use client"
import React, { useEffect, useState } from 'react'
import { SecondaryButton, TabsButton } from './Button'
import { useTokens } from '../hooks/useTokens'
import TokensTable from './TokensTable'
import SwapTokens from './SwapTokens'
import { LoaderIcon } from 'lucide-react'

type Tabs = "token"|"swap"|"send"|"add_funds"|"withdraw"

const Assets = ({publicKey}:{
    publicKey:string
}) => {
    const [copied, setcopied] = useState(false);
    const { loading,tokenBalances } = useTokens(publicKey);
    // 8fCXUDCkvhEQkYNyMbsWgYsaqikorojdv2hgfezfvbdD
    const [tabs, settabs] = useState<Tabs>("token");
    const [active, setactive] = useState<Tabs>("token")
    useEffect(()=>{
        if(copied){
            let timeOut = setTimeout(() => {
                setcopied(false)
            }, 3000);
            return ()=>{
                clearTimeout(timeOut)
            }
        }
    },[copied])

    if(loading){
        <div className='flex items-center justify-center'>
            <LoaderIcon/>
        </div>
    }
  return (
    <div className='text-slate-200 mt-4'>
        <p className='text-gray-300 mb-4'>Account Assets</p>
        <div className='flex justify-between  pb-4'>
            <div>
                <p className='text-4xl font-bold'><span className='text-5xl font-extrabold'>{tokenBalances?.totalBalance.toFixed(2)} </span>USD</p> 
            </div>
            <div>
                <SecondaryButton onClick={()=>{
                    setcopied(true)
                    navigator.clipboard.writeText(publicKey)
                }}>
                    {copied?"Copied":"Your Wallet Address"}
                </SecondaryButton>
            </div>
        </div>
        {/* Button for Navigate */}
       {tabs==="token" && <div className='flex items-center justify-between p-1 mt-2'>
           <TabsButton onClick={()=>{settabs("send"), setactive("send")}}>Send</TabsButton>
           <TabsButton onClick={()=>{settabs("add_funds"),setactive("add_funds")}}>Add Funds</TabsButton>
           <TabsButton onClick={()=>settabs("withdraw")}>Withdraw</TabsButton>
           <TabsButton onClick={()=>settabs("swap")}>Swap</TabsButton>
        </div>}
       
       {/* THis section should change according to Tabs */}
       <div className={`mt-8 flex flex-col gap-3 ${tabs==="token"?"visible":"hidden"}`}><TokensTable tokenBalances={tokenBalances !!}/></div>
       <div className={`mt-4 flex flex-col gap-3 ${tabs==="send"?"visible":"hidden"}`}>
            <BackButton onClick={()=>settabs("token")}/>
            <h1 className='text-center'>We do not Support this yet</h1>
       </div>
       <div className={`mt-4 flex flex-col gap-3 ${tabs==="add_funds"?"visible":"hidden"}`}>
            <BackButton onClick={()=>settabs("token")}/>
            <h1 className='text-center'>We do not Support this yet</h1>
       </div>
       <div className={`mt-4 ${tabs==="swap"?"visible":"hidden"}`}>
            <BackButton onClick={()=>settabs("token")}/>
            <SwapTokens balances={tokenBalances}/>
       </div>
    </div>
  )
}
export default Assets

const BackButton = ({onClick}:{
    onClick:()=>void
})=>{
    return (
        <div className='text-2xl font-bold cursor-pointer' onClick={onClick}>&larr;</div>
    )
}