"use client"

import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react'
import PrimaryButton from './Button';

const Appbar = () => {
    const session = useSession();
  return (
    <div className='p-3 px-5 flex justify-between items-center bg-zinc-800'>
        <p className='text-xl text-yellow-400'><span className='text-2xl'>D</span>cex</p>
       <div>
        {session.data?.user?<PrimaryButton onClick={()=>signOut()}>Logout</PrimaryButton>:(
            <PrimaryButton onClick={()=>signIn()}>Login</PrimaryButton>
        )}
       </div>
    </div>
  )
}

export default Appbar