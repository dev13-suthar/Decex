/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useState } from 'react'
import { SUPPORTED_TOKEN, TokenDetails } from '../Tokens'
import { TokenWithBalance } from '../hooks/useTokens'
import { SecondaryButton } from './Button'
import axios from 'axios'
import QuoteAmountLoader from './QuoteAmountLoader'

const SwapTokens = ({balances}:{
  balances:{
    totalBalance: number;
    tokens: TokenWithBalance[];
  }|null
}) => {
  const [baseAsset, setbaseAsset] = useState(SUPPORTED_TOKEN[0])
  const [quoteAsset, setquoteAsset] = useState(SUPPORTED_TOKEN[2]);
  const [baseAmount, setbaseAmount] = useState<string>();
  const [quoteAmount, setquoteAmount] = useState<string>();
  const [quoteLoading, setquoteLoading] = useState(false);
  const [quoteResponse, setquoteResponse] = useState(null)

  useEffect(()=>{
    if(!baseAmount){
      return
    }
      const getData = setTimeout(async() => {
          setquoteLoading(true)
          const res = await axios.get(`https://quote-api.jup.ag/v6/quote?inputMint=${baseAsset.mint}&outputMint=${quoteAsset.mint}&amount=${Number(baseAmount)*(10 ** baseAsset.decimals)}&slippageBps=50`);
          const data = await res.data.outAmount;
          setquoteAmount((Number(data)/Number(10 ** quoteAsset.decimals)).toFixed(2).toString());
          setquoteResponse(res.data)
          setquoteLoading(false);
      }, 2000);
      return ()=>clearTimeout(getData)
  },[baseAsset,baseAmount,quoteAsset]) 
  return (
    <div className='p-2'>
      <div className='text-2xl font-bold pb-5'>
          <p>Swap Tokens</p>
      </div>
      <SwapInputRow onSelect={(asset)=>{
      setbaseAsset(asset)}} 
      selectedToken={baseAsset} 
      amount={baseAmount}
      onAmountChange={(value:string)=>setbaseAmount(value)}
      title='You Pay' 
      subtitle={`Current balance: ${balances?.tokens.find(x=>x.name===baseAsset.name)?.balance}  ${baseAsset.name}`} 
      topBorderEnabled={true} 
      bottomBorderEnabled={false}/>
      <div className='flex justify-center'>
          <div onClick={()=>{
            let baseAssetTemp = baseAsset;
            setbaseAsset(quoteAsset);
            setquoteAsset(baseAssetTemp)
          }} className='cursor-pointer rounded-full w-10 h-10 border absolute mt-[-20px] bg-white flex justify-center items-center'>
              <span className='text-black'>&uarr;&darr;</span>
          </div>
      </div>
       <SwapInputRow onSelect={(asset)=>{
       setquoteAsset(asset)}}
       selectedToken={quoteAsset} 
       amount={quoteAmount}
       subtitle={`Current balance: ${balances?.tokens.find(x=>x.name===quoteAsset.name)?.balance} ${quoteAsset.name}`} 
       title='You Receive'
       topBorderEnabled={false} 
       quoteLoading={quoteLoading}
       disabled={true}
       bottomBorderEnabled={true}/>

       <div className='flex justify-end p-1 pt-4'>
         <SecondaryButton  onClick={async()=>{
           const res =  await axios.post("/api/swap",{
                quoteResponse
            })
            if(res.data.txid){
                console.log("Transaction wassss Succcesssss")
            }else{
              console.log("errr")
            }
         }}>Swap</SecondaryButton>
       </div>
    </div>
  )
}
export default SwapTokens

function SwapInputRow({onSelect,selectedToken,title,topBorderEnabled,bottomBorderEnabled,subtitle,amount,onAmountChange,quoteLoading,disabled=false}:{
  onSelect:(asset:TokenDetails)=>void,
  selectedToken:TokenDetails,
  title:string,
  subtitle?:string
  topBorderEnabled:boolean,
  amount?:string
  bottomBorderEnabled:boolean,
  onAmountChange?:(value:string)=>void,
  quoteLoading?:boolean,
  disabled?:boolean
}){
  return(
    <>
    <div className={`p-2  w-full border items-center flex justify-between ${topBorderEnabled?"rounded-t-xl":null} ${bottomBorderEnabled?"rounded-b-xl":""}`}>
          <div className='p-1 flex flex-col gap-1 justify-start items-start w-[33%]'>
              <p className='text-stone-300 text-xs font-extrabold'>{title}</p>
              <AssetSelector selectedToken={selectedToken} onSelect={onSelect}/>  
              <p className='text-stone-300 text-xs'>{subtitle}</p>
          </div>
          <div className='flex flex-col gap-1 items-end w-[67%] p-3'>
              {quoteLoading?(
                  <div className='flex justify-center items-center'>
                    <QuoteAmountLoader/>
                  </div>
              ):(
                <input onChange={(e)=>{
                onAmountChange?.(e.target.value)
              }} value={amount} placeholder='0' type='text' disabled={disabled} className='w-[67%] bg-[#3F3F46] outline-none text-4xl text-right' dir='rtl'/>
              )}
          </div>
    </div>
    </>
  )
}

function AssetSelector({selectedToken,onSelect}:{
  selectedToken:TokenDetails,
  onSelect:(asset:TokenDetails)=>void
}){
  return(
    <div className='p-0 w-24'>
        <select onChange={(e)=>{
          const selectedToken = SUPPORTED_TOKEN.find(x=>x.name === e.target.value);
          if(selectedToken){
              onSelect(selectedToken)
          }
        }} id='contie' className='bg-gray-500 border border-gray-300 text-sm rounded-lg block w-full p-2.5'>
              {SUPPORTED_TOKEN.map(token=><option key={token.name} selected={selectedToken.name===token.name}>{token.name}</option>)}
        </select>
    </div>
  )
}