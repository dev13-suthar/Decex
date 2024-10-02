import React from 'react'
import { totalBalancesType } from '../hooks/useTokens'
import Image from 'next/image'

const TokensTable = ({tokenBalances}:{
    tokenBalances:totalBalancesType
}) => {
  return (
    <>
    {tokenBalances?.tokens.map((t)=>(
                    <div className='flex justify-between p-1' key={t.mint}>
                    <div className='flex w-max justify-between items-center gap-3'>
                        <Image src={t.image} alt={t.name} height={40} width={40} className='rounded-full'/>
                        <div className='flex flex-col gap-1'>
                           <p className='text-xl font-semibold'>{t.name}</p>
                           <p className='text-gray-300 text-xs'>1 {t.name} = {Number(t.price).toFixed(2)}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 justify-end items-end'>
                        <p className='text-font-bold'>${Number(t.usdBalance).toFixed(2)}</p>
                        <p className='text-gray-300 text-xs'>{Number(t.balance).toFixed(2)}{t.name}</p>
                    </div>
                </div>    
            ))}
    </>
  )
}

export default TokensTable